const Officer = require("../models/Officer");
const { uploadImage, deleteImage } = require("../config/s3");

// CREATE
exports.createOfficer = async (req, res) => {
  try {
    const { name, post, contact } = req.body;

    let image = "";
    let imageKey = "";

    if (req.file) {
      const upload = await uploadImage(req.file);
      image = upload.image;
      imageKey = upload.imageKey;
    }

    const officer = await Officer.create({
      name,
      post,
      contact,
      image,
      imageKey,
    });

    res.status(201).json(officer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Officer create failed" });
  }
};

// READ
exports.getOfficers = async (req, res) => {
  try {
    const officers = await Officer.find().sort({ createdAt: -1 });
    res.json(officers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateOfficer = async (req, res) => {
  try {
    const officer = await Officer.findById(req.params.id);
    if (!officer) return res.status(404).json({ message: "Not found" });

    if (req.file) {
      if (officer.imageKey) {
        await deleteImage(officer.imageKey);
      }

      const upload = await uploadImage(req.file, "officers");
      officer.image = upload.image;
      officer.imageKey = upload.imageKey;
    }

    officer.name = req.body.name;
    officer.post = req.body.post;
    officer.contact = req.body.contact;

    await officer.save();
    res.json(officer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteOfficer = async (req, res) => {
  try {
    const officer = await Officer.findById(req.params.id);
    if (!officer) return res.status(404).json({ message: "Not found" });

    if (officer.imageKey) {
      await deleteImage(officer.imageKey);
    }

    await officer.deleteOne();

    res.json({ message: "Officer deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TOGGLE
exports.toggleOfficerStatus = async (req, res) => {
  try {
    const officer = await Officer.findById(req.params.id);
    if (!officer) return res.status(404).json({ message: "Not found" });

    officer.isActive = !officer.isActive;
    await officer.save();

    res.json(officer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};