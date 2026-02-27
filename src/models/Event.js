const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  date: Date,
  image: String, // CloudFront URL
  imageKey: String, // S3 key
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Event", EventSchema);