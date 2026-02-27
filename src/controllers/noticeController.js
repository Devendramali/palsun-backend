const Notice = require("../models/Notice");
const { uploadImage, deleteImage } = require("../config/s3");

// GET
const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
const createNotice = async (req, res) => {
  try {
    const { title, subtitle, date } = req.body;

    const upload = await uploadImage(req.file, "notices");

    const notice = new Notice({
      title,
      subtitle,
      date,
      image: upload.image,
      imageKey: upload.imageKey
    });

    await notice.save();
    res.status(201).json(notice);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });

    notice.title = req.body.title || notice.title;
    notice.subtitle = req.body.subtitle || notice.subtitle;
    notice.date = req.body.date || notice.date;

    if (req.file) {
      await deleteImage(notice.imageKey);

      const upload = await uploadImage(req.file, "notices");
      notice.image = upload.image;
      notice.imageKey = upload.imageKey;
    }

    await notice.save();
    res.json(notice);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });

    await deleteImage(notice.imageKey);
    await notice.deleteOne();

    res.json({ message: "Notice deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Notice delete failed" });
  }
};

// TOGGLE
const togglenotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: "Not found" });

    notice.isActive = !notice.isActive;
    await notice.save();

    res.json({ message: "Status updated", notice });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getNotices, createNotice, updateNotice, deleteNotice, togglenotice };