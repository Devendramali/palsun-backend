const ExpenditureReport = require("../models/ExpenditureReport");
const { uploadImage } = require("../config/s3"); // same function you used earlier

// GET ALL REPORTS
exports.getReports = async (req, res) => {
  try {
    const reports = await ExpenditureReport.find().sort({ createdAt: -1 });
    res.json(reports);
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

    let pdfData = { image: "", imageKey: "" };

    if (req.file) {
      pdfData = await uploadImage(req.file, "expenditure");
    }

    const report = new ExpenditureReport({
      title,
      year,
      depositAmount,
      expenditureAmount,
      balanceAmount,
      pdf: pdfData.image
    });

    await report.save();
    res.status(201).json(report);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE REPORT
exports.deleteReport = async (req, res) => {
  try {
    const report = await ExpenditureReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

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

    report.title = req.body.title || report.title;
    report.year = req.body.year || report.year;
    report.depositAmount = req.body.depositAmount || report.depositAmount;
    report.expenditureAmount = req.body.expenditureAmount || report.expenditureAmount;
    report.balanceAmount = req.body.balanceAmount || report.balanceAmount;

    if (req.file) {
      const pdfData = await uploadImage(req.file, "expenditure");
      report.pdf = pdfData.image;
    }

    await report.save();
    res.json(report);

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