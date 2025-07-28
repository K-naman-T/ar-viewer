// filepath: c:\Users\Naman\Desktop\ar-viewer\server\middleware\uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Configure local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null, 
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype === 'model/gltf-binary' || file.originalname.endsWith('.glb')) {
    cb(null, true);
  } else {
    cb(new Error('Only GLB files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 } // 100 MB limit
});

module.exports = { upload };