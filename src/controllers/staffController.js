const Staff = require("../models/Staff");
const { uploadImage, deleteImage } = require("../config/s3");

// GET
exports.getStaffs = async (req, res) => {
  try {
    const staffs = await Staff.find({});
    res.json(staffs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
exports.createStaff = async (req, res) => {
  try {
    const { name, post, contact } = req.body;

    if (post === "Sarpanch" && await Staff.findOne({ post: "Sarpanch" }))
      return res.status(400).json({ message: "Only one Sarpanch allowed" });

    if (post === "Upasarpanch" && await Staff.findOne({ post: "Upasarpanch" }))
      return res.status(400).json({ message: "Only one Upasarpanch allowed" });

    const upload = await uploadImage(req.file, "staff");

    const staff = new Staff({
      name,
      post,
      contact,
      image: upload.image,
      imageKey: upload.imageKey
    });

    await staff.save();
    res.status(201).json(staff);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateStaff = async (req, res) => {
  try {
    const { name, post, contact } = req.body;
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    if (post === "Sarpanch") {
      const exists = await Staff.findOne({ post: "Sarpanch", _id: { $ne: staff._id } });
      if (exists) return res.status(400).json({ message: "Only one Sarpanch allowed" });
    }

    if (post === "Upasarpanch") {
      const exists = await Staff.findOne({ post: "Upasarpanch", _id: { $ne: staff._id } });
      if (exists) return res.status(400).json({ message: "Only one Upasarpanch allowed" });
    }

    staff.name = name || staff.name;
    staff.post = post || staff.post;
    staff.contact = contact || staff.contact;

    if (req.file) {
      // delete old image
      await deleteImage(staff.imageKey);

      const upload = await uploadImage(req.file, "staff");
      staff.image = upload.image;
      staff.imageKey = upload.imageKey;
    }

    await staff.save();
    res.json(staff);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    await deleteImage(staff.imageKey);
    await staff.deleteOne();

    res.json({ message: "Staff deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TOGGLE
exports.togglestaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Not found" });

    staff.isActive = !staff.isActive;
    await staff.save();

    res.json({ message: "Status updated", staff });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};