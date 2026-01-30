const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads/gallery");

// Ensure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // keep extension
    const fileName = `${Date.now()}${ext}`; // 1769362734686.jpeg
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|mp4|mov|avi|webm/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());

  if (ext) cb(null, true);
  else cb(new Error("Only images & videos allowed"));
};

module.exports = multer({ storage, fileFilter });
