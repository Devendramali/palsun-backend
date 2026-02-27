const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const bannerController = require("../controllers/bannerController");

router.post("/add", upload.single("image"), bannerController.addBanner);
router.get("/", bannerController.getBanners);
router.put("/update/:id", upload.single("image"), bannerController.updateBanner);
router.delete("/delete/:id", bannerController.deleteBanner);
router.put("/toggle/:id", bannerController.toggleBanner);

module.exports = router;
