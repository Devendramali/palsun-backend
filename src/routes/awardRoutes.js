const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload"); // he use kara
const awardController = require("../controllers/awardController");

router.get("/", awardController.getAwards);
router.post("/", upload.single("file"), awardController.createAward);
router.put("/:id", upload.single("file"), awardController.updateAward);
router.delete("/:id", awardController.deleteAward);
router.put("/toggle/:id", awardController.toggleAward);

module.exports = router;