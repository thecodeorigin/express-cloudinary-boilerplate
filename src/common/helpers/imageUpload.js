const multer = require('multer');
const path = require('path');
const {HTTPException} = require('./errorHandler');
const MulterMessage = require('../json/multerMessage.json');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage,
  limits: {
    fieldNameSize: 10,          // Field max 10 words
    fileSize: 1024*1024*4,      // The size of file
  },

  fileFilter: (req, file, cb) => {
    try {
      const ext = path.extname(file.originalname);
      if(!['.png', '.jpg', '.jpeg'].includes(ext)) {
        return cb(new HTTPException(400, `File must be image`));
      }
      return cb(null, true);
    } catch (error) {
      return cb(new HTTPException(500, "An error has occurred while uploading image"));
    }
  },
});

/**
 * 
 * @param {*} keyName The field name
 * @param {*} single Check if this is a single upload or multiple upload
 * @param {*} maxCount Maximum file counts (Only available in multiple upload)
 */
const imageUpload = (keyName, single, maxCount) => {
  return (req, res, next) => {
    let uploadHandler;

    if(single) {
      uploadHandler = upload.single(keyName);
    } else {
      uploadHandler = upload.array(keyName, maxCount);
    }

    uploadHandler(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        next(new HTTPException(400, MulterMessage[err.code]));
      } else if (err) {
        next(err);
      }
      next();
    });
  };
};
module.exports = {
  imageUpload,
};