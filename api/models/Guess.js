const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuessSchema = new Schema({
  progress: {
    type: Schema.Types.ObjectId,
    ref: "progresses",
  },
  value: {
    type: String,
  },
  guessed_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = Guess = mongoose.model("guess", GuessSchema);
