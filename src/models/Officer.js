const mongoose = require("mongoose");

const officerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    post: { type: String, required: true },
    contact: { type: String },
    image: { type: String },
    imageKey: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Officer", officerSchema);
