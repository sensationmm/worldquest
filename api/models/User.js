const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_logged_in: {
    type: Date,
  },
  last_played_at: {
    type: Date,
  },
  referred_by: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  clue_tokens: {
    type: Number,
  }
});

module.exports = User = mongoose.model("users", UserSchema);
