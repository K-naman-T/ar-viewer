const express = require('express');
const { 
  getModels, 
  getModelById, 
  createModel, 
  updateModel, 
  deleteModel 
} = require('../controllers/modelController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.route('/')
  .get(getModels)
  .post(protect, admin, upload.single('modelFile'), createModel);

router.route('/:id')
  .get(getModelById)
  .put(protect, admin, updateModel)
  .delete(protect, admin, deleteModel);

module.exports = router;