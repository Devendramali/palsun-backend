const Suvichar = require("../models/Suvichar");

// GET all Suvichar
exports.getSuvichars = async (req, res) => {
  try {
    const data = await Suvichar.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE Suvichar
exports.createSuvichar = async (req, res) => {
  try {
    const { text, author } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const newSuvichar = await Suvichar.create({ text, author });
    res.status(201).json(newSuvichar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Suvichar
exports.deleteSuvichar = async (req, res) => {
  try {
    await Suvichar.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSuvichar = async (req, res) => {
  try {
    const { text, author } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const updated = await Suvichar.findByIdAndUpdate(
      req.params.id,
      { text, author },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};