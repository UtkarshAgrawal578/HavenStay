const mongoose = require('mongoose');

const { Schema } = mongoose;

const StudentSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true, // No duplicate student IDs
    trim: true
  },
  hostel: {
    type: String,
    required: true,
    trim: true
  },
 
  roomNumber: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  course: {
    type: String
  },
  year: {
    type: Number,
    min: 1,
    max: 6
  },
  
  date: {
    type: Date,
    default: Date.now
  },
  branch:{
    type: String
  }

});

const Student = mongoose.model("student", StudentSchema);

module.exports = Student;
