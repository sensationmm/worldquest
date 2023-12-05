const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  name: {type: String, required: true, unique: true},
  data: {type: Buffer, required: true},
  contentType: {type: String, required: true},
});

module.exports = Image = mongoose.model('image', ImageSchema);
