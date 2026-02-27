const mongoose = require("mongoose");

const govProgramSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  link: { type: String },
  pdf: { type: String },
  pdfKey: { type: String }, // <-- add this
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("GovProgram", govProgramSchema);