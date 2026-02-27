const Gallery = require("../models/Gallery");
const { uploadImage, deleteImage } = require("../config/s3");

// GET ALL
exports.getGallery = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
exports.createGallery = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: "File required" });

    const upload = await uploadImage(file, "gallery");

    const item = new Gallery({
      title,
      type: file.mimetype.startsWith("video") ? "video" : "photo",
      file: upload.image,
      fileKey: upload.imageKey
    });

    await item.save();
    res.status(201).json(item);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteGallery = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    await deleteImage(item.fileKey);
    await item.deleteOne();

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TOGGLE ACTIVE
exports.togglegallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ message: "Not found" });

    gallery.isActive = !gallery.isActive;
    await gallery.save();

    res.json({ message: "Status updated", gallery });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};