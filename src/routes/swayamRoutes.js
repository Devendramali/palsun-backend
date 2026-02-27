const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const swayamController = require("../controllers/swayamController");

// GET all
router.get("/", swayamController.getAll);

// CREATE
router.post("/", upload.single("pdf"), swayamController.create);

// UPDATE
router.put("/:id", upload.single("pdf"), swayamController.update);

// DELETE
router.delete("/:id", swayamController.delete);

router.put("/toggle/:id", swayamController.toggleswayamghoshna);

module.exports = router;
