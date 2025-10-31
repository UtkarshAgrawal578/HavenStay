// routes/admin.js
const express = require("express");
const router = express.Router();
const Complaint = require("../Models/Complaint");
const User = require("../Models/Student"); // student schema
const Notice = require("../Models/Notices");


// Fetch all complaints with student info
router.get("/all-complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ date: -1 });

    // fetch all users whose studentId is in complaints
    const users = await User.find({
      studentId: { $in: complaints.map(c => c.user) },
    });

    // merge user info into complaints
    const enriched = complaints.map((c) => {
      const student = users.find((u) => u.studentId === c.user);
      return {
        ...c.toObject(),
        student: student
          ? {
              name: student.fullName,
              studentId: student.studentId,
              room: student.roomNumber,
              contact: student.phone,
              email: student.email,
              hostel:student.hostel,
             
            }
          : null,
      };
    });

    res.json(enriched);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.put("/update-status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    // validate status
    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // find and update complaint
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // return updated complaint
    );

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.json(complaint);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.post("/addNotice", async (req, res) => {
  try {
    const {  description } = req.body;
    const newNotice = new Notice({ description });
    await newNotice.save();
    res.status(201).json({ message: "Notice added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding notice", error });
  }
});

module.exports = router;
