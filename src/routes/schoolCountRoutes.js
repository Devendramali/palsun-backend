const express = require("express");
const router = express.Router();
const { getCount, updateCount } = require("../controllers/schoolCountController");

// const protect = require("../middleware/authMiddleware");

router.get("/", /*protect,*/ getCount);
router.put("/", /*protect,*/ updateCount);

module.exports = router;