const Banner = require("../models/Banner");
const { uploadImage, deleteImage } = require("../config/s3");

// ADD BANNER
exports.addBanner = async (req, res) => {
  try {
    const { title, subtitle } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const uploaded = await uploadImage(req.file, "banners");

    const banner = new Banner({
      title,
      subtitle,
      image: uploaded.image,
      imageKey: uploaded.imageKey,
    });

    await banner.save();

    res.json({ message: "Banner added successfully", banner });
  } catch (err) {
    console.error(err);
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
      // delete old image from S3
      if (banner.imageKey) {
        await deleteImage(banner.imageKey);
      }

      const uploaded = await uploadImage(req.file, "banners");
      banner.image = uploaded.image;
      banner.imageKey = uploaded.imageKey;
    }

    if (title) banner.title = title;
    if (subtitle) banner.subtitle = subtitle;

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

    if (banner.imageKey) {
      await deleteImage(banner.imageKey);
    }

    await banner.deleteOne();

    res.json({ message: "Banner deleted successfully" });
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