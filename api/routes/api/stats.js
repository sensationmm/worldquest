const express = require('express');
const router = express.Router();
const passport = require('passport');

const Guesses = require('../../models/Guess');
const Progresses = require('../../models/Progress');
const Riddles = require('../../models/Riddle');
const Stats = require('../../models/Stat');
const Users = require('../../models/User');

// @route   GET api/stats/test
// @desc    Tests stats route
// @access  Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'Stats works',
  }),
);

// @route   GET api/stats/latest
// @desc    Gets latest stats
// @access  Private
router.get('/latest', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Stats.findOne(null, null, { sort: { date: -1 }}).then(data => res.json(data))
})

// @route   GET api/stats/generate
// @desc    Compiles latest stats
// @access  Public
router.get('/generate', async (req, res) => {
  const prevStat = await Stats.findOne(null, null, { sort: { date: -1 }});
  const prevStatDate = prevStat?.date || '2021-01-01';
  const numUsers = await Users.estimatedDocumentCount();
  const riddles = await Riddles.find().then((riddles) => riddles.map((riddle) => ({
      order: riddle.order,
      id: riddle._id.toString()
    }))
  );

  const progressTally = {}
  let leaderID = undefined;
  let progressTallyMax = 1, numCompleted = 0, completedClues = 0, completedGuesses = 0;

  // Overall stats
  await Progresses.find({ completed_at: null }).then((currentStages) => {
    // Current stages - each user will only have one of these
    const userStages = currentStages.map((stage) => {
      const riddleId = stage?.riddle.toString();
      const currentStage = riddles.find((r) => r.id === riddleId).order;
      const currentStageLabel = `stage${currentStage}`;

      // Keep tally
      if(progressTally.hasOwnProperty(currentStageLabel)) {
        const newCount = progressTally[currentStageLabel] + 1;
        progressTally[currentStageLabel] = newCount;
        if(newCount > progressTallyMax) {
          progressTallyMax = newCount;
        }
      } else {
        progressTally[currentStageLabel] = 1;
      }

      return {
        stage: currentStage,
        user: stage.user,
        started_at: stage.started_at
      }
    })

    // Sort progresses into highest stage, then started earlier to get overall leader ID
    const sortedStages = userStages.sort((a,b) => a.stage === b.stage ? (a.started_at < b.started_at ? -1 : 1) : (a.stage > b.stage ? -1 : 1))
    leaderID =  sortedStages[0].user
  })

  const leader = await Users.findOne({ _id: leaderID }).then((user) => ({ name: user.name, avatar: user.avatar}))

  // Cumulative stats
  await Progresses.find({ completed_at: { $gt: prevStatDate } }).then(async (completedStages) => {
    numCompleted = completedStages.length;
    completedClues = completedStages.reduce((total, stage) => total + stage.clues, 0)

    await Promise.all(
      completedStages.map( async (stage) => {
        // Count guesses taken for stage
        const numGuesses = await Guesses.find({ progress: stage._id })
        completedGuesses += numGuesses.length;
      })
    )
  });

  const statData = {
    totalUsers: numUsers,
    numUsersPerStage: progressTally,
    numUsersPerStageMax: progressTallyMax,
    leader: leader,
    completedStages: {
      total: (prevStat?.completedStages.total || 0) + numCompleted,
      cluesUsed: (prevStat?.completedStages.cluesUsed || 0) + completedClues,
      guessesMade: (prevStat?.completedStages.guessesMade || 0) + completedGuesses,
    },
    date: Date.now()
  }

  const newStat = new Stat(statData);
  
  newStat
    .save()
    .then(() => {
      res.json({ msg: 'Stat saved', ...statData });
    })
    .catch((err) => res.status(400).json({ msg: 'Stat not saved', err: err }));
});

module.exports = router;