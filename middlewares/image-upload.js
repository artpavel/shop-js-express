const multer = require('multer');
const uuid = require('uuid').v4;

// config. Must be right name file and path
const upload = multer({
  storage: multer.diskStorage({
    destination: 'product-data/images',
    filename: (req, file, cb) => {
      cb(null, uuid() + '-' + file.originalname);
    }
  })
});

// save by input name='image'
const configuredMulterMiddleware = upload.single('image');

module.exports = configuredMulterMiddleware;