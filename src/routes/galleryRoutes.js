const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const galleryController = require("../controllers/galleryController");

router.get("/", galleryController.getGallery);
router.post("/", upload.single("file"), galleryController.createGallery);
router.delete("/:id", galleryController.deleteGallery);
router.put("/toggle/:id", galleryController.togglegallery);

module.exports = router;
