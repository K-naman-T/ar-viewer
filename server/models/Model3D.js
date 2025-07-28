
const mongoose = require('mongoose');

const model3DSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  modelPath: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    default: '/poster.png'
  },
  rotation: {
    type: String,
    default: '0deg 0deg 0deg'
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Model3D = mongoose.model('Model3D', model3DSchema);
module.exports = Model3D;