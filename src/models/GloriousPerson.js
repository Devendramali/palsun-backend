const mongoose = require("mongoose");

const gloriousPersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // CloudFront URL
  imageKey: { type: String }, // S3 key
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("GloriousPerson", gloriousPersonSchema);