const express = require("express");
const upload = require("../middleware/uploadMembers");
const protect = require("../middleware/authMiddleware"); // optional
const {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
  toggleMember
} = require("../controllers/memberController");

const router = express.Router();

router.get("/", getMembers);
router.post("/", protect, upload.single("image"), createMember);
router.put("/:id", protect, upload.single("image"), updateMember);
router.delete("/:id", protect, deleteMember); 
router.put("/toggle/:id", toggleMember);

module.exports = router;
