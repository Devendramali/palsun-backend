const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["photo", "video"], required: true },
  file: { type: String, required: true },
  fileKey: { type: String }, // ADD THIS
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Gallery", gallerySchema);