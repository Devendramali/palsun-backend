const express = require("express");
const router = express.Router();
const expenditureController = require("../controllers/expenditureController");
const upload = require("../middleware/upload");



// GET all reports
router.get("/", expenditureController.getReports);

// CREATE report with PDF upload
router.post("/", upload.single("pdf"), expenditureController.createReport);

// DELETE report
router.delete("/:id", expenditureController.deleteReport);

router.put("/:id", upload.single("pdf"), expenditureController.updateReport);

router.put("/toggle/:id", expenditureController.toggleexpenditurereport);


module.exports = router;
