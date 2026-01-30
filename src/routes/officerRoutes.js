const express = require("express");
const upload = require("../middleware/uploadOfficers");
const protect = require("../middleware/authMiddleware");
const {
  getOfficers,
  createOfficer,
  updateOfficer,
  deleteOfficer,
  toggleOfficer
} = require("../controllers/officerController");

const router = express.Router();

router.get("/", getOfficers);
router.post("/", protect, upload.single("image"), createOfficer);
router.put("/:id", protect, upload.single("image"), updateOfficer);
router.delete("/:id", protect, deleteOfficer);
router.put("/toggle/:id", toggleOfficer);

module.exports = router;
