const express = require("express");
const router = express.Router();
const Complaint = require("../Models/Complaint");
const fetchUser = require("../middleware/fetchUser");
const Notice = require("../Models/Notices");
// Add complaint
router.post("/add", fetchUser, async (req, res) => {
  try {
    const { category, title, description } = req.body;

    // Use studentId from the token
    const complaint = new Complaint({
      user: req.user.studentId, // <-- studentId here
      category,
      title,
      description,
      status: "Pending",
    });

    const savedComplaint = await complaint.save();
    res.json(savedComplaint);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get my complaints
router.get("/my", fetchUser, async (req, res) => {
  try {
    // Find complaints by logged-in student's studentId
    const complaints = await Complaint.find({ user: req.user.studentId }).sort({ date: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.get("/all", async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name room contact") // fetch student details
      .sort({ date: -1 });

    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.delete("/student/:id", fetchUser, async (req, res) => {
  try {
    // Find the complaint by ID and make sure it belongs to the logged-in student
    const complaint = await Complaint.findOne({ _id: req.params.id, studentId: req.user.id });
    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    // Only allow deletion if status is pending
    if (complaint.status !== "Pending") {
      return res.status(400).json({ success: false, message: "Cannot delete complaint after processing" });
    }

    // Hard delete from database
    await Complaint.deleteOne({ _id: req.params.id });

    res.json({ success: true, message: "Complaint deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});
router.get("/getNotices", async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notices", error });
  }
});
module.exports = router;
