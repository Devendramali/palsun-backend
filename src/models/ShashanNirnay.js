const mongoose = require("mongoose");

const nirnaySchema = new mongoose.Schema({
  title: { type: String, required: true },
  file: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ShashanNirnay", nirnaySchema);
