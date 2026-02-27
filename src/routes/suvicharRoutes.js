const express = require("express");
const { getSuvichars, createSuvichar, deleteSuvichar, updateSuvichar } = require("../controllers/suvicharController");

const router = express.Router();

router.get("/", getSuvichars);          // GET /api/suvichar
router.post("/", createSuvichar);       // POST /api/suvichar
router.delete("/:id", deleteSuvichar);  // DELETE /api/suvichar/:id
router.put("/:id", updateSuvichar);

module.exports = router;
