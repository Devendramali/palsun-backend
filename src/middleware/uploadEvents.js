const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Correct uploads path
const folder = path.join(__dirname, "../uploads/events");

// Ensure folder exists
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, folder),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

module.exports = multer({ storage });
