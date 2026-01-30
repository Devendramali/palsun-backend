const Banner = require("../models/Banner");
const fs = require("fs");
const path = require("path");

// ADD BANNER
exports.addBanner = async (req, res) => {
  try {
    const { title, subtitle } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const imagePath = `uploads/banners/${req.file.filename}`;

    const banner = new Banner({
      title,
      subtitle,
      image: imagePath
    });

    await banner.save();
    res.json({ message: "Banner added successfully", banner });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateBanner = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const banner = await Banner.findById(req.params.id);

    if (!banner) return res.status(404).json({ message: "Not found" });

    if (req.file) {
      const oldPath = path.join(__dirname, "..", banner.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      banner.image = `uploads/banners/${req.file.filename}`; // ✅ FIXED
    }

    banner.title = title;
    banner.subtitle = subtitle;

    await banner.save();
    res.json({ message: "Banner updated", banner });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Not found" });

    // Delete image file
    const imgPath = path.join(__dirname, "..", banner.image);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }

    // Delete DB record
    await banner.deleteOne();

    res.json({ message: "Banner + Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TOGGLE ACTIVE
exports.toggleBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Not found" });

    banner.isActive = !banner.isActive;
    await banner.save();

    res.json({ message: "Status updated", banner });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
