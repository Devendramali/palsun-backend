const Metric = require("../models/Metric");

// GET all metrics
exports.getMetrics = async (req, res) => {
  try {
    const inquiries = await Metric.findOne({ type: "inquiry" }) || { count: 0 };
    const visitors = await Metric.findOne({ type: "visitor" }) || { count: 0 };

    res.json({
      inquiries: inquiries.count,
      visitors: visitors.count
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE metric count
exports.updateMetric = async (req, res) => {
  try {
    const { type, count } = req.body;
    if (!type || count === undefined) {
      return res.status(400).json({ message: "Type and count are required" });
    }

    const metric = await Metric.findOneAndUpdate(
      { type },
      { count },
      { new: true, upsert: true } // create if not exists
    );

    res.json(metric);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
