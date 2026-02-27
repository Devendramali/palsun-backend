const Award = require("../models/Award");
const { uploadImage, deleteImage } = require("../config/s3");

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

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const { image, imageKey } = await uploadImage(req.file, "awards");

    const item = new Award({
      title,
      file: image,
      imageKey,
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

    if (req.body.title) item.title = req.body.title;

    if (req.file) {
      if (item.imageKey) {
        await deleteImage(item.imageKey);
      }

      const { image, imageKey } = await uploadImage(req.file, "awards");
      item.file = image;
      item.imageKey = imageKey;
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

    if (item.imageKey) {
      await deleteImage(item.imageKey);
    }

    await item.deleteOne();
    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TOGGLE
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