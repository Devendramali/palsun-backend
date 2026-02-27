const Mahiti = require("../models/Mahiti");
const { uploadImage, deleteImage } = require("../config/s3");

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

    if (!req.file) {
      return res.status(400).json({ message: "PDF file required" });
    }

    const uploaded = await uploadImage(req.file, "mahiti");

    const item = new Mahiti({
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
exports.updateMahiti = async (req, res) => {
  try {
    const item = await Mahiti.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    if (req.body.title) item.title = req.body.title;

    if (req.file) {
      const uploaded = await uploadImage(req.file, "mahiti");
      item.file = uploaded.image;
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