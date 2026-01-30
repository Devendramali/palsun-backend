const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads/banners");


if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
        const fileName = `${Date.now()}${ext}`; // timestamp.jpg
    cb(null, fileName);
    // cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());

  if (ext) cb(null, true);
  else cb(new Error("Only images allowed"));
};

module.exports = multer({ storage, fileFilter });
