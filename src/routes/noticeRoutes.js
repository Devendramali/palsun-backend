const express = require("express");
const upload = require("../middleware/upload");
const protect = require("../middleware/authMiddleware");

const {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
  togglenotice
} = require("../controllers/noticeController");

const router = express.Router();

router.get("/", getNotices);
router.post("/", protect, upload.single("image"), createNotice);
router.put("/:id", protect, upload.single("image"), updateNotice);
router.delete("/:id", protect, deleteNotice);
router.put("/toggle/:id", togglenotice);

module.exports = router;
