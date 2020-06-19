const express = require("express");
const router = express.Router();
const passport = require("passport");

const Guess = require("../../models/Guess");
const Progress = require("../../models/Progress");
const Riddle = require("../../models/Riddle");

// @route   GET api/progress/start
// @desc    Gets the first riddle
// @access  Private
router.get(
  "/start",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
      .catch(() => res.status(400).json("Riddle not found"));
  }
);

// @route   GET api/progress/current
// @desc    Gets the current riddle
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Progress.findOne({ user: req.user.id, completed_at: null })
      .then((progress) => {
        Riddle.findById(progress.riddle)
          .then((result) => {
            const riddle = {
              id: result.id,
              question: result.question,
              clue1: progress.clues > 0 ? result.clue1 : undefined,
              clue2: progress.clues > 1 ? result.clue2 : undefined,
              clue3: progress.clues > 2 ? result.clue3 : undefined,
            };

            res.json(riddle);
          })
          .catch((err) => res.status(400).json({ msg: "Riddle not found" }));
      })
      .catch((err) => res.status(400).json({ msg: "Progress not found" }));
  }
);

// @route   POST api/progress/clue
// @desc    Gets the next clue
// @access  Private
router.post(
  "/clue",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { progressID } = req.body;

    if (!progressID) {
      res.status(400).json({ msg: "progressID must be provided" });
    }

    Progress.findById(progressID)
      .then((progress) => {
        progress.clues++;

        if (progress.completed_at) {
          res.status(400).json({ msg: "Riddle already completed" });
        } else if (progress.clues > 3) {
          res.status(400).json({ msg: "No more clues" });
        } else {
          progress
            .save()
            .then((newProgress) => res.json(newProgress))
            .catch((err) => res.status(400).json(err));
        }
      })
      .catch((err) => res.status(400).json({ msg: "Progress not found" }));
  }
);

// @route   POST api/progress/guess
// @desc    Completes the current riddle and initialises the next
// @access  Private
router.post(
  "/guess",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { answer, riddleID, progressID } = req.body;

    if (!answer) {
      res.status(400).json({ msg: "Answer must be provided" });
    } else if (!riddleID) {
      res.status(400).json({ msg: "riddleID must be provided" });
    } else if (!progressID) {
      res.status(400).json({ msg: "progressID must be provided" });
    }

    const newGuess = new Guess({
      progress: progressID,
      value: answer,
    });

    newGuess
      .save()
      .then(() => {
        Riddle.findById(riddleID)
          .then((riddle) => {
            if (answer !== riddle.answer) {
              res.json({ msg: "INCORRECT" });
            } else {
              Progress.findById(progressID)
                .then((progress) => {
                  if (!progress.completed_at) {
                    progress.completed_at = Date.now();
                    progress
                      .save()
                      .then(() => {
                        Riddle.findOne({ order: riddle.order + 1 })
                          .then((nextRiddle) => {
                            const newProgress = new Progress({
                              user: req.user.id,
                              riddle: nextRiddle.id,
                            });

                            newProgress
                              .save()
                              .then(() => {
                                res.json({ msg: "CORRECT" });
                              })
                              .catch((err) => console.log(err));
                          })
                          .catch((err) =>
                            res
                              .status(400)
                              .json({ msg: "Next riddle not found" })
                          );
                      })
                      .catch((err) => res.status(400).json(err));
                  } else {
                    res.status(400).json({ msg: "Riddle already completed" });
                  }
                })
                .catch((err) =>
                  res.status(400).json({ msg: "Progress not found" })
                );
            }
          })
          .catch((err) => res.status(400).json({ msg: "Riddle not found" }));
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;
