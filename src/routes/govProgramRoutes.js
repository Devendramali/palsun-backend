const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const govController = require("../controllers/govProgramController");

router.get("/", govController.getAll);
router.post("/", upload.single("pdf"), govController.create);
router.put("/:id", upload.single("pdf"), govController.update);
router.delete("/:id", govController.delete);
router.put("/toggle/:id", govController.togglegovprogram);

module.exports = router;
