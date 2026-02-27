const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  title: { type: String },
  subtitle: { type: String },
  image: { type: String, required: true },
  imageKey: { type: String },   // add this
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Banner", bannerSchema);
