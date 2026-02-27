const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const mahitiController = require("../controllers/mahitiController");

router.get("/", mahitiController.getMahiti);
router.post("/", upload.single("file"), mahitiController.createMahiti);
router.put("/:id", upload.single("file"), mahitiController.updateMahiti);

router.delete("/:id", mahitiController.deleteMahiti);
router.put("/toggle/:id", mahitiController.togglemahiti);

module.exports = router;
