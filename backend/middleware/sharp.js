const sharp = require('sharp');

const fs = require('fs');

const path = require('path');

const inputFolderPath = path.join(__dirname, '../images');

const outputFolderPath = path.join(__dirname, '../images-min');

const resizeImage = (inputFilePath, outputFilePath) => {
  sharp(inputFilePath)
    .resize({ width: 465 })
    .toFile(outputFilePath)
    .then(()=> console.log("Image recadré"));
};

fs.readdir(inputFolderPath, (err, files) => {
  if (err) {
    console.error(err);
  } else {
    files.forEach((file) => {
      const inputFilePath = path.join(inputFolderPath, file);
      const outputFilePath = path.join(outputFolderPath, file);
      resizeImage(inputFilePath, outputFilePath);
    });
  }
});


