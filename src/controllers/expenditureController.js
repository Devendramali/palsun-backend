const ExpenditureReport = require("../models/ExpenditureReport");
const fs = require("fs");
const path = require("path");

// GET ALL REPORTS
exports.getReports = async (req, res) => {
  try {
    const reports = await ExpenditureReport.find().sort({ createdAt: -1 });

    const reportsWithPDFLink = reports.map((report) => ({
      ...report._doc,
      pdf: report.pdf ? `${req.protocol}://${req.get("host")}/${report.pdf.replace(/\\/g, "/")}` : null
    }));

    res.json(reportsWithPDFLink);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE REPORT
exports.createReport = async (req, res) => {
  try {
    const { title, year, depositAmount, expenditureAmount, balanceAmount } = req.body;

    if (!title || !year || !depositAmount || !expenditureAmount || !balanceAmount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const report = new ExpenditureReport({
      title,
      year,
      depositAmount,
      expenditureAmount,
      balanceAmount,
      pdf: req.file ? req.file.path : null
    });

    await report.save();

    const response = {
      ...report._doc,
      pdf: report.pdf ? `${req.protocol}://${req.get("host")}/${report.pdf.replace(/\\/g, "/")}` : null
    };

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE REPORT (also deletes PDF)
exports.deleteReport = async (req, res) => {
  try {
    const report = await ExpenditureReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    // Delete PDF from disk if exists
    if (report.pdf) {
      const filePath = path.resolve(report.pdf); // get absolute path
      fs.unlink(filePath, (err) => {
        if (err) console.error("Failed to delete PDF:", err);
      });
    }

    // Delete MongoDB document
    await report.deleteOne();

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// UPDATE REPORT
exports.updateReport = async (req, res) => {
  try {
    const report = await ExpenditureReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    // Update fields
    report.title = req.body.title || report.title;
    report.year = req.body.year || report.year;
    report.depositAmount = req.body.depositAmount || report.depositAmount;
    report.expenditureAmount = req.body.expenditureAmount || report.expenditureAmount;
    report.balanceAmount = req.body.balanceAmount || report.balanceAmount;

    // Replace PDF if new file uploaded
    if (req.file) {
      report.pdf = req.file.path;
    }

    await report.save();

    // Return full PDF URL
    const response = {
      ...report._doc,
      pdf: report.pdf ? `${req.protocol}://${req.get("host")}/${report.pdf.replace(/\\/g, "/")}` : null
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TOGGLE ACTIVE
exports.toggleexpenditurereport = async (req, res) => {
  try {
    const expenditurereport = await ExpenditureReport.findById(req.params.id);
    if (!expenditurereport) return res.status(404).json({ message: "Not found" });

    expenditurereport.isActive = !expenditurereport.isActive;
    await expenditurereport.save();

    res.json({ message: "Status updated", expenditurereport });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};