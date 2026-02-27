const SchoolCount = require("../models/SchoolCount");

// GET the count
exports.getCount = async (req, res) => {
  try {
    let count = await SchoolCount.findOne({ type: "schoolCount" });

    if (!count) {
      count = await SchoolCount.create({ type: "schoolCount" });
    }

    res.json(count);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE the count
// exports.updateCount = async (req, res) => {
//   try {
//     const { girls, boys, totalTeacher, contact } = req.body;

//     const count = await SchoolCount.findOneAndUpdate(
//       {},
//       {
//         ...(girls !== undefined && { girls }),
//         ...(boys !== undefined && { boys }),
//         ...(totalTeacher !== undefined && { totalTeacher }),
//         ...(contact !== undefined && { contact }),
//       },
//       {
//         new: true,
//         upsert: true, // create if not exists
//       }
//     );

//     res.json(count);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.updateCount = async (req, res) => {
  try {
    const { girls, boys, totalTeacher, contact } = req.body;

    let data = await SchoolCount.findOne({ type: "schoolCount" });

    if (!data) {
      data = new SchoolCount({ type: "schoolCount" });
    }

    if (girls !== undefined) data.girls = girls;
    if (boys !== undefined) data.boys = boys;
    if (totalTeacher !== undefined) data.totalTeacher = totalTeacher;
    if (contact !== undefined) data.contact = contact;

    await data.save();

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
