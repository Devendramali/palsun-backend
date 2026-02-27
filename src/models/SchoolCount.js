const mongoose = require("mongoose");

const schoolCountSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "schoolCount",
    },
    girls: Number,
    boys: Number,
    totalTeacher: Number,   // 👈 हे add आहे का check कर
    contact: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("SchoolCount", schoolCountSchema);