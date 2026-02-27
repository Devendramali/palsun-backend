const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf"   // <-- PDF add केलं
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG, WEBP images and PDF allowed"), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB (PDF साठी better)
  },
});

module.exports = upload;