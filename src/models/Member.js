const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  contact: { type: String },
  isActive: { type: Boolean, default: true },
  image: { type: String }
});

module.exports = mongoose.model("Member", memberSchema);
