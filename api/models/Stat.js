const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatSchema = new Schema({
  totalUsers: {
    type: Number,
  },
  numUsersPerStage: {
    type: Map,
    of: Number
  },
  numUsersPerStageMax: {
    type: Number
  },
  leader: {
    name: String,
    avatar: String,
  },
  completedStages: {
    total: Number,
    cluesUsed: Number,
    guessesMade: Number,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = Stat = mongoose.model("stat", StatSchema);
