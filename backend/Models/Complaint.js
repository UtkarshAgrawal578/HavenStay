const mongoose = require('mongoose');

const { Schema } = mongoose;

const ComplaintSchema = new Schema({
  user: {
  type: String, // store studentId
  required: true,
},
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,   // must provide category
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


const Complaint = mongoose.model("complaint", ComplaintSchema);

module.exports = Complaint;