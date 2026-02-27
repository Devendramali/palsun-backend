const mongoose = require("mongoose");

const SuvicharSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, default: "Anonymous" }
}, { timestamps: true });

module.exports = mongoose.model("Suvichar", SuvicharSchema);
