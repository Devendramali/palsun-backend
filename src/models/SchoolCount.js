const mongoose = require("mongoose");

const SchoolCountSchema = new mongoose.Schema(
  {
    girls: { type: Number, default: 0 },
    boys: { type: Number, default: 0 },
    contact: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SchoolCount", SchoolCountSchema);
