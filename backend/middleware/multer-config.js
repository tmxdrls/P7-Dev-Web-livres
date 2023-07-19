
const multer = require("multer");

//multer facilite la gestion des fichiers envoyés avec des requêtes http vers l'API
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

//un fichier unique qui est une image
module.exports = upload.single("image");


/*const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');
*/