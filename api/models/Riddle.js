const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RiddleSchema = new Schema({
  question: {
    type: Array,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  clue1: {
    type: String,
  },
  clue2: {
    type: String,
  },
  clue3: {
    type: String,
  },
  order: {
    type: Number,
  },
});

module.exports = Riddle = mongoose.model("riddle", RiddleSchema);
