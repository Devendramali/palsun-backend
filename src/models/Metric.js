const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema({
  type: { type: String, required: true }, // "inquiry" or "visitor"
  count: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Metric", metricSchema);
