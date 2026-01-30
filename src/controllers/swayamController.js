const SwayamGhoshnaPatre = require("../models/SwayamGhoshnaPatre");
const fs = require("fs");
const path = require("path");

// Helper to delete file safely
const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });
  }
};

// GET all items
exports.getAll = async (req, res) => {
  try {
    const items = await SwayamGhoshnaPatre.find().sort({ createdAt: -1 });
    res.json(items); // only relative path stored in PDF field
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// CREATE item
exports.create = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const item = new SwayamGhoshnaPatre({
      title,
      pdf: req.file ? `uploads/swayamGhoshna/${req.file.filename}` : null, // relative path
    });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ message: err.message });
  }
};

// UPDATE item
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const item = await SwayamGhoshnaPatre.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (title) item.title = title;

    if (req.file) {
      if (item.pdf) deleteFile(path.join(__dirname, "../", item.pdf));
      item.pdf = `uploads/swayamGhoshna/${req.file.filename}`; // relative path
    }

    await item.save();
    res.json(item);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE item
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await SwayamGhoshnaPatre.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.pdf) deleteFile(path.join(__dirname, "../", item.pdf));

    await item.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: err.message });
  }
};


// TOGGLE ACTIVE
exports.toggleswayamghoshna = async (req, res) => {
  try {
    const swayamghoshna = await SwayamGhoshnaPatre.findById(req.params.id);
    if (!swayamghoshna) return res.status(404).json({ message: "Not found" });

    swayamghoshna.isActive = !swayamghoshna.isActive;
    await swayamghoshna.save();

    res.json({ message: "Status updated", swayamghoshna });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};