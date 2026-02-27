const Member = require("../models/Member");
const { uploadImage, deleteImage } = require("../config/s3");

// CREATE
exports.createMember = async (req, res) => {
  try {
    const { name, role, contact } = req.body;

    let image = "";
    let imageKey = "";

    if (req.file) {
      const upload = await uploadImage(req.file, "members");
      image = upload.image;
      imageKey = upload.imageKey;
    }

    const member = await Member.create({
      name,
      role,
      contact,
      image,
      imageKey,
    });

    res.status(201).json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// READ
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Not found" });

    if (req.file) {
      if (member.imageKey) {
        await deleteImage(member.imageKey);
      }

      const upload = await uploadImage(req.file);
      member.image = upload.image;
      member.imageKey = upload.imageKey;
    }

    member.name = req.body.name;
    member.role = req.body.role;
    member.contact = req.body.contact;

    await member.save();
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Not found" });

    if (member.imageKey) {
      await deleteImage(member.imageKey);
    }

    await member.deleteOne();
    res.json({ message: "Member deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TOGGLE STATUS
exports.toggleMemberStatus = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Not found" });

    member.isActive = !member.isActive;
    await member.save();

    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};