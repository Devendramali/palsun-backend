const GovProgram = require("../models/GovProgram");
const { uploadImage, deleteImage } = require("../config/s3");

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const items = await GovProgram.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { title, subtitle, link } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    let fileData = { image: "", imageKey: "" };

    if (req.file) {
      fileData = await uploadImage(req.file, "govPrograms");
    }

    const item = new GovProgram({
      title,
      subtitle,
      link,
      pdf: fileData.image,
      pdfKey: fileData.imageKey
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
    const { title, subtitle, link } = req.body;

    const item = await GovProgram.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.title = title || item.title;
    item.subtitle = subtitle || item.subtitle;
    item.link = link || item.link;

    if (req.file) {
      if (item.pdfKey) {
        await deleteImage(item.pdfKey);
      }

      const fileData = await uploadImage(req.file, "govPrograms");
      item.pdf = fileData.image;
      item.pdfKey = fileData.imageKey;
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
    const item = await GovProgram.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.pdfKey) {
      await deleteImage(item.pdfKey);
    }

    await item.deleteOne();
    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TOGGLE
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