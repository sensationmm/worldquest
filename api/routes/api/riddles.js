const express = require("express");
const router = express.Router();

const validateRiddleInput = require("../../validation/riddle");

const Riddle = require("../../models/Riddle");

// @route   POST api/riddles/create
// @desc    Create a riddle
// @access  Public
router.post("/create", (req, res) => {
  const { errors, isValid } = validateRiddleInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Riddle.findOne()
    .sort("-order")
    .then((riddle) => {
      const newRiddle = new Riddle({
        question: req.body.question,
        answer: req.body.answer,
        clue1: req.body.clue1,
        clue2: req.body.clue2,
        clue3: req.body.clue3,
        order: riddle.order + 1,
      });

      newRiddle
        .save()
        .then((riddle) => res.json(riddle))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
