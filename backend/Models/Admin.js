const mongoose = require('mongoose');

const { Schema } = mongoose;

const AdminSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  adminId: {
    type: String,
    required: true,
    unique: true, // this will be used to validate admin signup
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
    minlength: 6 // always store hashed
  },
  Designation: {
    type: String,
    enum: ["warden", "caretaker", "maintenance", "superadmin"], 
    default: "warden"
  },
  hostel: {
    type: String, // which hostel/block this admin manages
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Admin = mongoose.model("admin", AdminSchema);

module.exports = Admin;
