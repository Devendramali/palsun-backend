const SchoolCount = require("../models/SchoolCount");

// GET the count (only one document assumed)
exports.getCount = async (req, res) => {
  try {
    let count = await SchoolCount.findOne();
    if (!count) {
      // If not exist, create default
      count = new SchoolCount();
      await count.save();
    }
    res.json(count);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE the count
exports.updateCount = async (req, res) => {
  try {
    let count = await SchoolCount.findOne();
    if (!count) {
      count = new SchoolCount();
    }

    count.girls = req.body.girls ?? count.girls;
    count.boys = req.body.boys ?? count.boys;
    count.contact = req.body.contact ?? count.contact;

    await count.save();
    res.json(count);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
