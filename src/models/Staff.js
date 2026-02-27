const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    post: { type: String, required: true },
    contact: { type: String },
    isActive: { type: Boolean, default: true },
    image: { type: String },
    imageKey: { type: String }, // ADD THIS
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", StaffSchema);