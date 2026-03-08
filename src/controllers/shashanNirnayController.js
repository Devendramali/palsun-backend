const ShashanNirnay = require("../models/ShashanNirnay");
const { uploadImage, deleteImage } = require("../config/s3");

// GET ALL
exports.getNirnay = async (req, res) => {
  try {
    const items = await ShashanNirnay.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
exports.createNirnay = async (req, res) => {
  try {
    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "PDF file required" });
    }

    const uploaded = await uploadImage(req.file, "shashanNirnay");

    const item = new ShashanNirnay({
      title,
      file: uploaded.image,
    });

    await item.save();
    res.status(201).json(item);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateNirnay = async (req, res) => {
  try {
    const item = await ShashanNirnay.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    if (req.body.title) item.title = req.body.title;

    if (req.file) {
      const uploaded = await uploadImage(req.file, "shashanNirnay");
      item.file = uploaded.image;
    }

    await item.save();
    res.json(item);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteNirnay = async (req, res) => {
  try {
    const item = await ShashanNirnay.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    await item.deleteOne();
    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TOGGLE ACTIVE
exports.toggleNirnay = async (req, res) => {
  try {
    const shashanirnay = await ShashanNirnay.findById(req.params.id);
    if (!shashanirnay) return res.status(404).json({ message: "Not found" });

    shashanirnay.isActive = !shashanirnay.isActive;
    await shashanirnay.save();

    res.json({ message: "Status updated", shashanirnay });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};