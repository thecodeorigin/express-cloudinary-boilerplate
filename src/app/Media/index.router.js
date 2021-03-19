const { imageUpload } = require('../../common/helpers/imageUpload');
const {uploadSingle, uploadMany} = require('./index.controller');

module.exports = [
  { prefix: 'media', method: 'post', path: `single`, handlers: [imageUpload('image', true), uploadSingle] },
  { prefix: 'media', method: 'post', path: `many`, handlers: [imageUpload('images', false, 5), uploadMany] },
];