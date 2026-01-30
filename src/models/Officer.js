const mongoose = require("mongoose");

const officerSchema = new mongoose.Schema(
  {
    name: String,
    post: String,
    contact: String,
    isActive: { type: Boolean, default: true },
    image: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Officer", officerSchema);
