const {cloudinaryUploader} = require('../../config/cloudinary');

const uploadSingle = async (req, res, next) => {
  try {
    const data = await cloudinaryUploader(req.file.path);
    return res.json({
      status: 'success',
      statusCode: 200,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const uploadMany = async (req, res, next) => {
  try {
    const promises = [];
    for (let i = 0; i < req.files.length; i++) {
      promises.push(cloudinaryUploader(req.files[i].path));
    }
    const data = await Promise.all(promises);
    return res.json({
      status: 'success',
      statusCode: 200,
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadSingle,
  uploadMany,
};