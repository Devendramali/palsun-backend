const GovProgram = require("../models/GovProgram");
const fs = require("fs");
const path = require("path");

// Helper to delete file
const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) fs.unlink(filePath, (err) => err && console.error(err));
};

// GET all
exports.getAll = async (req, res) => {
  try {
    const items = await GovProgram.find().sort({ createdAt: -1 });
    res.json(items); // pdf stored as root-relative path
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { title, subtitle, link } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const item = new GovProgram({
      title,
      subtitle,
      link,
      pdf: req.file ? `uploads/govPrograms/${req.file.filename}` : null,
    });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, link } = req.body;

    const item = await GovProgram.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (title) item.title = title;
    if (subtitle) item.subtitle = subtitle;
    if (link) item.link = link;

    if (req.file) {
      if (item.pdf) deleteFile(path.join(__dirname, "../", item.pdf));
      item.pdf = `uploads/govPrograms/${req.file.filename}`;
    }

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await GovProgram.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.pdf) deleteFile(path.join(__dirname, "../", item.pdf));

    await item.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// TOGGLE ACTIVE
exports.togglegovprogram = async (req, res) => {
  try {
    const govprogram = await GovProgram.findById(req.params.id);
    if (!govprogram) return res.status(404).json({ message: "Not found" });

    govprogram.isActive = !govprogram.isActive;
    await govprogram.save();

    res.json({ message: "Status updated", govprogram });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};