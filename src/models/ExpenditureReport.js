const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  depositAmount: { type: Number, required: true },
  expenditureAmount: { type: Number, required: true },
  balanceAmount: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
  pdf: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ExpenditureReport", reportSchema);
