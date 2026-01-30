const express = require("express");
const router = express.Router();

const uploadGallery = require("../middleware/uploadGallery");
const galleryController = require("../controllers/galleryController");

router.get("/", galleryController.getGallery);
router.post("/", uploadGallery.single("file"), galleryController.createGallery);
router.delete("/:id", galleryController.deleteGallery);
router.put("/toggle/:id", galleryController.togglegallery);

module.exports = router;
