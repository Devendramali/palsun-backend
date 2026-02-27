const mongoose = require("mongoose");

const swayamSchema = new mongoose.Schema({
  title: { type: String, required: true },
  pdf: { type: String }, // Path to uploaded PDF
  createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("SwayamGhoshnaPatre", swayamSchema);
