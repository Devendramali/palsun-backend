const Contact = require("../models/Contact");

// Create Contact
exports.createContact = async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ error: "All fields required" });
    }

    const contact = await Contact.create({ name, phone, message });
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Status
exports.updateStatus = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
