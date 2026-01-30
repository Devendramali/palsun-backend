const Officer = require("../models/Officer");
const fs = require("fs");
const path = require("path");

// GET all officers
exports.getOfficers = async (req, res) => {
  try {
    const officers = await Officer.find({});
    res.json(officers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE officer
exports.createOfficer = async (req, res) => {
  try {
    const { name, post, contact } = req.body;

    if (post === "Sarpanch" && await Officer.findOne({ post: "Sarpanch" }))
      return res.status(400).json({ message: "Only one Sarpanch allowed" });

    if (post === "Upasarpanch" && await Officer.findOne({ post: "Upasarpanch" }))
      return res.status(400).json({ message: "Only one Upasarpanch allowed" });

    const image = req.file ? `/uploads/officers/${req.file.filename}` : null;

    const officer = new Officer({ name, post, contact, image });
    await officer.save();

    res.status(201).json(officer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE officer
exports.updateOfficer = async (req, res) => {
  try {
    const { name, post, contact } = req.body;
    const officer = await Officer.findById(req.params.id);

    if (!officer) return res.status(404).json({ message: "Officer not found" });

    if (post === "Sarpanch") {
      const exists = await Officer.findOne({ post: "Sarpanch", _id: { $ne: officer._id } });
      if (exists) return res.status(400).json({ message: "Only one Sarpanch allowed" });
    }

    if (post === "Upasarpanch") {
      const exists = await Officer.findOne({ post: "Upasarpanch", _id: { $ne: officer._id } });
      if (exists) return res.status(400).json({ message: "Only one Upasarpanch allowed" });
    }

    officer.name = name || officer.name;
    officer.post = post || officer.post;
    officer.contact = contact || officer.contact;

    // Replace image if new uploaded
    if (req.file) {
      officer.image = `/uploads/officers/${req.file.filename}`;
    }

    await officer.save();
    res.json(officer);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE officer
exports.deleteOfficer = async (req, res) => {
  try {
    const officer = await Officer.findById(req.params.id);
    if (!officer) return res.status(404).json({ message: "Officer not found" });

    // Delete image safely
    if (officer.image) {
      const imagePath = path.join(__dirname, "..", officer.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("Deleted officer image:", imagePath);
      } else {
        console.log("Officer image not found:", imagePath);
      }
    }

    await officer.deleteOne();
    res.json({ message: "Officer deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Officer delete failed" });
  }
};


// TOGGLE ACTIVE
exports.toggleOfficer = async (req, res) => {
  try {
    const officer = await Officer.findById(req.params.id);
    if (!officer) return res.status(404).json({ message: "Not found" });

    officer.isActive = !officer.isActive;
    await officer.save();

    res.json({ message: "Status updated", officer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};