const SwayamGhoshnaPatre = require("../models/SwayamGhoshnaPatre");
const { uploadImage } = require("../config/s3");

// GET
exports.getAll = async (req, res) => {
  try {
    const items = await SwayamGhoshnaPatre.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { title } = req.body;

    let pdfUrl = null;

    if (req.file) {
      const uploaded = await uploadImage(req.file, "swayamGhoshna");
      pdfUrl = uploaded.image;
    }

    const item = new SwayamGhoshnaPatre({
      title,
      pdf: pdfUrl,
    });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const item = await SwayamGhoshnaPatre.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    item.title = req.body.title || item.title;

    if (req.file) {
      const uploaded = await uploadImage(req.file, "swayamGhoshna");
      item.pdf = uploaded.image;
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
    const item = await SwayamGhoshnaPatre.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    await item.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TOGGLE
exports.toggleswayamghoshna = async (req, res) => {
  try {
    const item = await SwayamGhoshnaPatre.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    item.isActive = !item.isActive;
    await item.save();

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};