const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getNirnay,
  createNirnay,
  updateNirnay,
  deleteNirnay,
  toggleNirnay
} = require("../controllers/shashanNirnayController");

router.get("/", getNirnay);

router.post("/", upload.single("file"), createNirnay);

router.put("/:id", upload.single("file"), updateNirnay);

router.delete("/:id", deleteNirnay);

router.put("/toggle/:id", toggleNirnay);

module.exports = router;