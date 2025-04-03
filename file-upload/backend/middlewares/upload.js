import multer from 'multer';
import CloudinaryStorage from '../services/cloudinary.js';

const allowedExtensions = ['jpeg', 'jpg', 'png', 'webp', 'avif'];

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './upload');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + '-' + file.originalname);
//   },
// });

// const storage = multer.memoryStorage();

const storage = new CloudinaryStorage();

const fileFilter = (req, file, cb) => {
  const fileExt = file.mimetype.split('/')[1];

  if (!allowedExtensions.includes(fileExt)) {
    const err = new Error(`Wrong file type, only ${allowedExtensions.join(', ')} allowed`);
    err.statusCode = 400;
    cb(err);
  } else {
    cb(null, true);
  }
};

const fileSize = 1_048_576 * 2; // 2mb

const upload = multer({ storage, fileFilter, limits: { fileSize } });

export default upload;
