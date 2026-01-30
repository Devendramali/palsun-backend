const Award = require("../models/Award");
const fs = require("fs");
const path = require("path");

// GET ALL
exports.getAwards = async (req, res) => {
  try {
    const items = await Award.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
exports.createAward = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Image required" });
    }

    const item = new Award({
      title,
      file: `/uploads/awards/${file.filename}`
    });

    await item.save();
    res.status(201).json(item);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateAward = async (req, res) => {
  try {
    const item = await Award.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    // Update title
    if (req.body.title) item.title = req.body.title;

    // Replace image if uploaded
    if (req.file) {
      const oldFilePath = path.join(__dirname, "..", item.file);
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);

      item.file = `/uploads/awards/${req.file.filename}`;
    }

    await item.save();
    res.json(item);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteAward = async (req, res) => {
  try {
    const item = await Award.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    const filePath = path.join(__dirname, "..", item.file);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await item.deleteOne();
    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TOGGLE ACTIVE
exports.toggleAward = async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);
    if (!award) return res.status(404).json({ message: "Not found" });

    award.isActive = !award.isActive;
    await award.save();

    res.json({ message: "Status updated", award });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};