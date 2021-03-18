const uploadSingle = (req, res, next) => {
  try {
    return res.json({
      file: req.file,
    });
  } catch (error) {
    next(error);
  }
};

const uploadMany = (req, res, next) => {
  try {
    return res.json({
      files: req.files,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadSingle,
  uploadMany,
};