const Member = require("../models/Member");

// GET all members
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find({});
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE member
exports.createMember = async (req, res) => {
  try {
    const { name, role, contact } = req.body;

    if (role === "Sarpanch" && await Member.findOne({ role: "Sarpanch" }))
      return res.status(400).json({ message: "Only one Sarpanch allowed" });

    if (role === "Upasarpanch" && await Member.findOne({ role: "Upasarpanch" }))
      return res.status(400).json({ message: "Only one Upasarpanch allowed" });

    const image = req.file ? `/uploads/members/${req.file.filename}` : null;

    const member = new Member({ name, role, contact, image });
    await member.save();

    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE member
exports.updateMember = async (req, res) => {
  try {
    const { name, role, contact } = req.body;
    const member = await Member.findById(req.params.id);

    if (!member) return res.status(404).json({ message: "Member not found" });

    member.name = name || member.name;
    member.role = role || member.role;
    member.contact = contact || member.contact;

    if (req.file) {
      member.image = `/uploads/members/${req.file.filename}`;
    }

    await member.save();
    res.json(member);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE member
exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });

    if (member.image) {
      const fs = require("fs");
      const path = require("path");

      const imagePath = path.join(__dirname, "..", member.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await member.deleteOne();
    res.json({ message: "Member deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

// TOGGLE ACTIVE
exports.toggleMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Not found" });

    member.isActive = !member.isActive;
    await member.save();

    res.json({ message: "Status updated", member });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};