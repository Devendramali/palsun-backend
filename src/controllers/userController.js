const User = require("../models/User");

// GET users
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// CREATE user
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Empty check
    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    // Email format validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Duplicate email check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create user
    const user = await User.create({ name, email });

    res.status(201).json({
      message: "✅ User created successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
};
