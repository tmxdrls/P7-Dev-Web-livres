const multer = require("multer");

const fileFilter = function (req, file, callback) {
  const fileSupported = ["image/jpeg", "image/jpg", "image/png"];
  if (!fileSupported.includes(file.mimetype)) {
    const error = new Error("format d'image non supporté");
    error.code = "LIMIT_FILE_TYPES";
    return callback(error, false);
  }
  callback(null, true);
};

const storage = multer.memoryStorage();

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload.single("image");

