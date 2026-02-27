const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  message: String,
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Contact", ContactSchema);
