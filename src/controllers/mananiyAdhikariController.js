const MananiyAdhikari = require("../models/MananiyAdhikari");
const { uploadImage, deleteImage } = require("../config/s3");

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const data = await MananiyAdhikari.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { name, post } = req.body;

    let image = "";
    let imageKey = "";

    if (req.file) {
      const uploaded = await uploadImage(req.file, "mananiy");
      image = uploaded.image;
      imageKey = uploaded.imageKey;
    }

    const data = await MananiyAdhikari.create({
      name,
      post,
      image,
      imageKey,
    });

    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Create failed" });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { name, post } = req.body;

    const item = await MananiyAdhikari.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }

    let image = item.image;
    let imageKey = item.imageKey;

    if (req.file) {
      if (imageKey) {
        await deleteImage(imageKey);
      }

      const uploaded = await uploadImage(req.file);
      image = uploaded.image;
      imageKey = uploaded.imageKey;
    }

    item.name = name;
    item.post = post;
    item.image = image;
    item.imageKey = imageKey;

    await item.save();

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const item = await MananiyAdhikari.findById(req.params.id);

    if (item?.imageKey) {
      await deleteImage(item.imageKey);
    }

    await MananiyAdhikari.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE
exports.toggleStatus = async (req, res) => {
  try {
    const item = await MananiyAdhikari.findById(req.params.id);
    item.isActive = !item.isActive;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};