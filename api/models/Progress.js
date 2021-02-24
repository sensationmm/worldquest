const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProgressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  riddle: {
    type: Schema.Types.ObjectId,
    ref: 'riddles',
  },
  clues: {
    type: Number,
    min: 0,
    max: 3,
    default: 0,
  },
  completed_at: {
    type: Date,
  },
});

module.exports = Progress = mongoose.model('progress', ProgressSchema);
