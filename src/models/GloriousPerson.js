const mongoose = require("mongoose");

const gloriousPersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // relative path to uploaded image
    isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("GloriousPerson", gloriousPersonSchema);
