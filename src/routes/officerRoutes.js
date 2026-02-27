const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // change
const controller = require("../controllers/officerController");

router.get("/", controller.getOfficers);
router.post("/", upload.single("image"), controller.createOfficer);
router.put("/:id", upload.single("image"), controller.updateOfficer);
router.delete("/:id", controller.deleteOfficer);
router.patch("/:id/toggle", controller.toggleOfficerStatus);

module.exports = router;