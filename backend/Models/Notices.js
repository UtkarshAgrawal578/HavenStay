const mongoose = require("mongoose");
const { Schema } = mongoose;

const noticeSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});
const Notice = mongoose.model("Notice", noticeSchema);
module.exports = Notice;