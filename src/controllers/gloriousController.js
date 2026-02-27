const GloriousPerson = require("../models/GloriousPerson");
const { uploadImage, deleteImage } = require("../config/s3");

// GET all
exports.getAll = async (req, res) => {
  try {
    const items = await GloriousPerson.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    let image = "";
    let imageKey = "";

    if (req.file) {
      const upload = await uploadImage(req.file, "gloriousPersons");
      image = upload.image;
      imageKey = upload.imageKey;
    }

    const item = new GloriousPerson({
      name,
      description,
      image,
      imageKey,
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
    const { name, description } = req.body;

    const item = await GloriousPerson.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (name) item.name = name;
    if (description) item.description = description;

    if (req.file) {
      if (item.imageKey) {
        await deleteImage(item.imageKey);
      }

      const upload = await uploadImage(req.file, "gloriousPersons");
      item.image = upload.image;
      item.imageKey = upload.imageKey;
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

    const item = await GloriousPerson.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

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
exports.togglegloriousperson = async (req, res) => {
  try {
    const gloriousperson = await GloriousPerson.findById(req.params.id);
    if (!gloriousperson)
      return res.status(404).json({ message: "Not found" });

    gloriousperson.isActive = !gloriousperson.isActive;
    await gloriousperson.save();

    res.json({ message: "Status updated", gloriousperson });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};