const Staff = require("../models/Staff");
const fs = require("fs");
const path = require("path");

// GET all staff
exports.getStaffs = async (req, res) => {
  try {
    const staffs = await Staff.find({});
    res.json(staffs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE staff
exports.createStaff = async (req, res) => {
  try {
    const { name, post, contact } = req.body;

    // Only one Sarpanch/Upasarpanch allowed
    if (post === "Sarpanch" && await Staff.findOne({ post: "Sarpanch" }))
      return res.status(400).json({ message: "Only one Sarpanch allowed" });

    if (post === "Upasarpanch" && await Staff.findOne({ post: "Upasarpanch" }))
      return res.status(400).json({ message: "Only one Upasarpanch allowed" });

    const image = req.file ? `/uploads/staff/${req.file.filename}` : null;

    const staff = new Staff({ name, post, contact, image });
    await staff.save();

    res.status(201).json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE staff
exports.updateStaff = async (req, res) => {
  try {
    const { name, post, contact } = req.body;
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    if (post === "Sarpanch") {
      const exists = await Staff.findOne({ post: "Sarpanch", _id: { $ne: staff._id } });
      if (exists) return res.status(400).json({ message: "Only one Sarpanch allowed" });
    }

    if (post === "Upasarpanch") {
      const exists = await Staff.findOne({ post: "Upasarpanch", _id: { $ne: staff._id } });
      if (exists) return res.status(400).json({ message: "Only one Upasarpanch allowed" });
    }

    staff.name = name || staff.name;
    staff.post = post || staff.post;
    staff.contact = contact || staff.contact;
    if (req.file) staff.image = `/uploads/staff/${req.file.filename}`;

    await staff.save();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE staff
exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    // Delete image
    if (staff.image) {
      const imgPath = path.join(__dirname, "..", staff.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await staff.deleteOne();
    res.json({ message: "Staff deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TOGGLE ACTIVE
exports.togglestaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Not found" });

    staff.isActive = !staff.isActive;
    await staff.save();

    res.json({ message: "Status updated", staff });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};