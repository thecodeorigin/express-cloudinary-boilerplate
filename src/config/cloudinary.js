const cloudinary = require("cloudinary").v2;
const fs = require('fs');
require('dotenv').config({ path: __dirname + '/../../.env' });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET, 
});

const cloudinaryUploader = (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (err, result) => {
      if(err) return reject(err);
      fs.unlinkSync(filePath);
      return resolve(result);
    });
  });
}

module.exports = {
  cloudinaryUploader,
}
