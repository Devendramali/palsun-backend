const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

router.get("/profile", auth, (req, res) => {
  res.json({
    message: "Protected profile data",
    userId: req.user.id
  });
});

module.exports = router;
