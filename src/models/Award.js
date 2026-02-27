const mongoose = require("mongoose");

const awardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  file: { type: String, required: true }, // CloudFront URL
  imageKey: { type: String }, // S3 key
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Award", awardSchema);