const Notice = require("../models/Notice");

// GET all notices
const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE notice
const createNotice = async (req, res) => {
  try {
    const { title, subtitle, date } = req.body;

    const image = req.file ? `/uploads/notices/${req.file.filename}` : null;

    const notice = new Notice({
      title,
      subtitle,
      date,
      image
    });

    await notice.save();
    res.status(201).json(notice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE notice
const updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });

    notice.title = req.body.title || notice.title;
    notice.subtitle = req.body.subtitle || notice.subtitle;
    notice.date = req.body.date || notice.date;

    if (req.file) {
      notice.image = `/uploads/notices/${req.file.filename}`;
    }

    await notice.save();
    res.json(notice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE notice
const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });

    if (notice.image) {
      const fs = require("fs");
      const path = require("path");

      const imagePath = path.join(process.cwd(), notice.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("Deleted notice image:", imagePath);
      } else {
        console.log("Notice image not found:", imagePath);
      }
    }

    await notice.deleteOne();

    res.json({ message: "Notice deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Notice delete failed" });
  }
};


// TOGGLE ACTIVE
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
