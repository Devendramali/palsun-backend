const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    contact: { type: String },
    image: { type: String },     // CloudFront URL
    imageKey: { type: String },  // S3 key
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
