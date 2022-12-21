const multer = require("multer");
const fs = require("fs");

const folderPath = "./public/uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // If "images" folder doesn't exists, create one
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + file.originalname);
  },
});

const filter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const imgUpload = multer({
  storage: storage,
  fileFilter: filter,
});

module.exports = imgUpload;
