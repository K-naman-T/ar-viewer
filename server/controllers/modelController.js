const Model3D = require('../models/Model3D');

// @desc    Get all models
// @route   GET /api/models
// @access  Public
const getModels = async (req, res) => {
  try {
    const models = await Model3D.find({}).sort({ createdAt: -1 });
    res.json(models);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get model by ID
// @route   GET /api/models/:id
// @access  Public
const getModelById = async (req, res) => {
  try {
    const model = await Model3D.findById(req.params.id);
    if (model) {
      res.json(model);
    } else {
      res.status(404).json({ message: 'Model not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a model
// @route   POST /api/models
// @access  Private/Admin
const createModel = async (req, res) => {
  try {
    const { title, description, rotation } = req.body;
    
    // Use a relative path or get the host from the request
    const modelPath = req.file 
      ? `/uploads/${req.file.filename}`  // Use a relative path
      : req.body.modelPath;
    
    if (!modelPath) {
      return res.status(400).json({ message: 'Model file or path is required' });
    }

    const model = new Model3D({
      title,
      description,
      modelPath,
      rotation: rotation || '0deg 0deg 0deg',
      uploadedBy: req.user._id
    });

    const createdModel = await model.save();
    res.status(201).json(createdModel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a model
// @route   PUT /api/models/:id
// @access  Private/Admin
const updateModel = async (req, res) => {
  try {
    const { title, description, modelPath, poster, rotation } = req.body;

    const model = await Model3D.findById(req.params.id);

    if (model) {
      model.title = title || model.title;
      model.description = description || model.description;
      model.modelPath = modelPath || model.modelPath;
      model.poster = poster || model.poster;
      model.rotation = rotation || model.rotation;

      const updatedModel = await model.save();
      res.json(updatedModel);
    } else {
      res.status(404).json({ message: 'Model not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a model
// @route   DELETE /api/models/:id
// @access  Private/Admin
const deleteModel = async (req, res) => {
  try {
    const model = await Model3D.findById(req.params.id);

    if (model) {
      await model.remove();
      res.json({ message: 'Model removed' });
    } else {
      res.status(404).json({ message: 'Model not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getModels,
  getModelById,
  createModel,
  updateModel,
  deleteModel
};