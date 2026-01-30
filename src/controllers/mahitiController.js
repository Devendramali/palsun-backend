const Mahiti = require("../models/Mahiti");
const fs = require("fs");
const path = require("path");

// GET ALL
exports.getMahiti = async (req, res) => {
  try {
    const items = await Mahiti.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
exports.createMahiti = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "PDF file required" });
    }

    const item = new Mahiti({
      title,
      file: `/uploads/mahiti/${file.filename}`
    });

    await item.save();
    res.status(201).json(item);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateMahiti = async (req, res) => {
  try {
    const item = await Mahiti.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    // Update title
    if (req.body.title) item.title = req.body.title;

    // Replace file if new file uploaded
    if (req.file) {
      const oldFilePath = path.join(__dirname, "..", item.file);
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);

      item.file = `/uploads/mahiti/${req.file.filename}`;
    }

    await item.save();
    res.json(item);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteMahiti = async (req, res) => {
  try {
    const item = await Mahiti.findById(req.params.id);
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
exports.togglemahiti = async (req, res) => {
  try {
    const mahiti = await Mahiti.findById(req.params.id);
    if (!mahiti) return res.status(404).json({ message: "Not found" });

    mahiti.isActive = !mahiti.isActive;
    await mahiti.save();

    res.json({ message: "Status updated", mahiti });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};