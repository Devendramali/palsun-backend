const mongoose = require("mongoose");

const govProgramSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  link: { type: String },       // optional link
  pdf: { type: String },        // optional PDF relative path
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("GovProgram", govProgramSchema);
