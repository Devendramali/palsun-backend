const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const gloriousController = require("../controllers/gloriousController");

router.get("/", gloriousController.getAll);
router.post("/", upload.single("image"), gloriousController.create);
router.put("/:id", upload.single("image"), gloriousController.update);
router.delete("/:id", gloriousController.delete);
router.put("/toggle/:id", gloriousController.togglegloriousperson);

module.exports = router;
