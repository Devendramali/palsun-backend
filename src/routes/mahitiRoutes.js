const express = require("express");
const router = express.Router();

const uploadMahiti = require("../middleware/uploadMahiti");
const mahitiController = require("../controllers/mahitiController");

router.get("/", mahitiController.getMahiti);
router.post("/", uploadMahiti.single("file"), mahitiController.createMahiti);
router.put("/:id", uploadMahiti.single("file"), mahitiController.updateMahiti);
router.delete("/:id", mahitiController.deleteMahiti);
router.put("/toggle/:id", mahitiController.togglemahiti);

module.exports = router;
