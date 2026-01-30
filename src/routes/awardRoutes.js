const express = require("express");
const router = express.Router();

const uploadAward = require("../middleware/uploadAward");
const awardController = require("../controllers/awardController");

router.get("/", awardController.getAwards);
router.post("/", uploadAward.single("file"), awardController.createAward);
router.put("/:id", uploadAward.single("file"), awardController.updateAward);
router.delete("/:id", awardController.deleteAward);
router.put("/toggle/:id",  awardController.toggleAward);

module.exports = router;
