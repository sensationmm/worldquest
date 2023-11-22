const express = require('express');
const router = express.Router();
const passport = require('passport');

const Guess = require('../../models/Guess');
const Progress = require('../../models/Progress');
const Riddle = require('../../models/Riddle');
const User = require('../../models/User');

const GuessesPayload = (guesses) => {
  return guesses.map((guess) => {
    return { value: guess.value, guessedAt: guess.guessed_at };
  });
};

const RiddlePayload = (user, riddle, progress, guesses) => {
  const payload = {
    id: riddle.id,
    progressId: progress.id,
    order: riddle.order,
    question: riddle.question,
    clue1: progress.clues > 0 ? riddle.clue1 : undefined,
    clue2: progress.clues > 1 ? riddle.clue2 : undefined,
    clue3: progress.clues > 2 ? riddle.clue3 : undefined,
    clueTokens: user.clue_tokens,
    guesses: GuessesPayload(guesses),
    completedAt: progress.completed_at,
    lastPlayedAt: user.last_played_at,
  };

  return payload;
};

// @route   GET api/progress/start
// @desc    Gets the first riddle
// @access  Private
router.get('/start', passport.authenticate('jwt', { session: false }), (req, res) => {
  Progress.find({ user: req.user.id })
    .then((progress) => {
      if (progress.length > 0) {
        res.status(400).json({ msg: 'User already started' });
      } else {
        Riddle.findOne({ order: 1 })
          .then((riddle) => {
            const newProgress = new Progress({
              user: req.user.id,
              riddle: riddle.id,
            });

            newProgress
              .save()
              .then((progress) => res.json(progress))
              .catch((err) => console.log(err));
          })
          .catch(() => res.status(400).json({ msg: 'Riddle not found' }));
      }
    })
    .catch(() => res.status(400).json({ msg: 'Start failed' }));
});

// @route   GET api/progress/current
// @desc    Gets the current riddle
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const today = new Date();
  const getDate = today.getDate();
  const getMonth = today.getMonth();
  const getYear = today.getFullYear();

  Progress.findOne({
    $or: [
      {
        user: req.user.id,
        completed_at: {
          $gte: new Date(getYear, getMonth, getDate),
        },
      },
      { user: req.user.id, completed_at: null },
    ],
  })
    .then((progress) => {
      User.findById(req.user.id)
        .then((user) => {
          Riddle.findById(progress.riddle)
            .then((result) => {
              Guess.find({ progress: progress.id })
                .sort({ guessed_at: -1 })
                .then((guesses) => {
                  const riddle = RiddlePayload(user, result, progress, guesses);
                  res.json(riddle);
                })
                .catch((err) => res.status(400).json({ msg: 'Guess not found' }));
            })
            .catch((err) => res.status(400).json({ msg: 'Riddle not found' }));
        })
        .catch((err) => res.status(400).json({ msg: 'User not found' }));
    })
    .catch((err) => res.status(400).json({ msg: 'Progress not found' }));
});

// @route   GET api/progress/completed
// @desc    Gets completed riddles
// @access  Private
router.get('/completed', passport.authenticate('jwt', { session: false }), (req, res) => {
  Progress.find({ user: req.user.id, completed_at: { $ne: null } })
    .then((progress) => {
      const completedRiddles = [];
      Promise.all(
        progress.map((completedRiddle) => {
          return Riddle.findById(completedRiddle.riddle)
            .then((result) => {
              return Guess.find({ progress: completedRiddle.id })
                .then((guesses) => {
                  const riddle = {
                    id: result.id,
                    question: result.question,
                    answer: result.answer,
                    order: result.order,
                    clue1: result.clue1,
                    clue2: result.clue2,
                    clue3: result.clue3,
                    completedAt: completedRiddle.completed_at,
                    cluesUsed: completedRiddle.clues,
                    guesses: guesses.length,
                  };

                  return completedRiddles.push(riddle);
                })
                .catch((err) => res.status(400).json({ msg: 'Guess not found' }));
            })
            .catch(() => res.status(400).json({ msg: 'Riddle not found' }));
        }),
      )
        .then(() => {
          const results = completedRiddles.sort((a, b) => (a.completedAt > b.completedAt ? -1 : 1));
          res.json(results);
        })
        .catch((err) => res.status(400).json({ msg: `Failed: ${err}` }));
    })
    .catch(() => res.status(400).json({ msg: 'Progress not found' }));
});

// @route   POST api/progress/clue
// @desc    Gets the next clue
// @access  Private
router.post('/clue', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { progressId } = req.body;

  if (!progressId) {
    res.status(400).json({ msg: 'progressId must be provided' });
  }

  Progress.findById(progressId)
    .then((progress) => {
      User.findById(progress.user)
        .then((user) => {
          progress.clues++;

          if (progress.completed_at) {
            res.status(400).json({ msg: 'Riddle already completed' });
          } else if (user.clue_tokens === 0) {
            res.status(400).json({ msg: 'No clue tokens available' });
          } else if (progress.clues > 3) {
            res.status(400).json({ msg: 'No more clues' });
          } else {
            user.clue_tokens--;

            user
              .save()
              .then((newUser) => {
                progress
                  .save()
                  .then((newProgress) => {
                    Riddle.findById(newProgress.riddle).then((result) => {
                      Guess.find({ progress: newProgress.id })
                        .sort({ guessed_at: -1 })
                        .then((guesses) => {
                          const riddle = RiddlePayload(newUser, result, newProgress, guesses);
                          res.json(riddle);
                        });
                    });
                  })
                  .catch((err) => res.status(400).json(err));
              })
              .catch((err) => res.status(400).json(err));
          }
        })
        .catch((err) => res.status(400).json({ msg: 'User not found' }));
    })
    .catch((err) => res.status(400).json({ msg: 'Progress not found' }));
});

// @route   POST api/progress/guess
// @desc    Completes the current riddle and initialises the next
// @access  Private
router.post('/guess', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { answer, riddleId, progressId } = req.body;

  if (!answer) {
    res.status(400).json({ msg: 'Answer must be provided' });
  } else if (!riddleId) {
    res.status(400).json({ msg: 'riddleId must be provided' });
  } else if (!progressId) {
    res.status(400).json({ msg: 'progressId must be provided' });
  }

  const newGuess = new Guess({
    progress: progressId,
    value: answer,
  });

  newGuess
    .save()
    .then(() => {
      Riddle.findById(riddleId)
        .then((riddle) => {
          User.findByIdAndUpdate({ _id: req.user.id }, { last_played_at: new Date() }).then(() => {
            if (answer.toLowerCase() !== riddle.answer.toLowerCase()) {
              Guess.find({ progress: progressId })
                .sort({ guessed_at: -1 })
                .then((guesses) => {
                  res.json({ guesses: GuessesPayload(guesses), msg: 'INCORRECT' });
                })
                .catch((err) => res.status(400).json({ msg: 'Guess not found' }));
            } else {
              Progress.findById(progressId)
                .then((progress) => {
                  if (!progress.completed_at) {
                    const now = Date.now();
                    progress.completed_at = now;
                    progress
                      .save()
                      .then(() => {
                        Riddle.findOne({ order: riddle.order + 1 })
                          .then((nextRiddle) => {
                            const newProgress = new Progress({
                              user: req.user.id,
                              riddle: nextRiddle.id,
                              started_at: now
                            });

                            newProgress
                              .save()
                              .then(() => {
                                res.json({ msg: 'CORRECT' });
                              })
                              .catch((err) => res.status(400).json({ msg: 'New progress not saved' }));
                          })
                          .catch((err) => res.status(400).json({ msg: 'Next riddle not found' }));
                      })
                      .catch((err) => res.status(400).json(err));
                  } else {
                    res.status(400).json({ msg: 'Riddle already completed' });
                  }
                })
                .catch((err) => res.status(400).json({ msg: 'Progress not found' }));
            }
          });
        })
        .catch((err) => res.status(400).json({ msg: 'Riddle not found' }));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
