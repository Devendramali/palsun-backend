const mongoose = require("mongoose");

const mahitiSchema = new mongoose.Schema({
  title: { type: String, required: true },
  file: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Mahiti", mahitiSchema);
