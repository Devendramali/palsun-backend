const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getStaffs,
  createStaff,
  updateStaff,
  deleteStaff,
  togglestaff
} = require("../controllers/staffController");

// const protect = require("../middleware/authMiddleware");

router.get("/", getStaffs);
router.post("/", /*protect,*/ upload.single("image"), createStaff);
router.put("/:id", /*protect,*/ upload.single("image"), updateStaff);
router.delete("/:id", /*protect,*/ deleteStaff);
router.put("/toggle/:id", togglestaff);

module.exports = router;
