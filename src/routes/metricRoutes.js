const express = require("express");
const router = express.Router();
const metricController = require("../controllers/metricController");

// Get all metrics
router.get("/", metricController.getMetrics);

// Update metric count
router.put("/", metricController.updateMetric);

module.exports = router;
