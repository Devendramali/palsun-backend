const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    date: { type: Date, required: true },
      isActive: { type: Boolean, default: true },
    image: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notice", noticeSchema);
