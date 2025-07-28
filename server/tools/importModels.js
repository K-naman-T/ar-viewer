const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Import Model3D model
const Model3D = require('../models/Model3D');

// Read the public directory
const publicDir = path.resolve(__dirname, '../../public');

// Model metadata - you can customize descriptions as needed
const modelMetadata = {
  'coal truck.glb': {
    title: 'COAL TRUCK',
    description: 'Heavy-duty vehicle used for transporting coal from mining sites to processing plants or power stations.',
  },
  'dozer.glb': {
    title: 'BULLDOZER',
    description: 'Powerful earthmoving equipment used for pushing large quantities of soil, sand, or other materials during construction or mining.',
  },
  'dump truck.glb': {
    title: 'DUMP TRUCK',
    description: 'Mining dump truck designed to transport large volumes of materials such as ore, coal, or overburden in mining operations.',
    rotation: '0deg 90deg 0deg'
  },
  'empty truck.glb': {
    title: 'EMPTY TRUCK',
    description: 'An unloaded mining truck used for transportation of materials in mining operations.',
  },
  'jadupatia.glb': {
    title: 'JADUPATIA',
    description: 'A cultural artifact model showcasing traditional craftsmanship and design.',
  },
  'khovar.glb': {
    title: 'KHOVAR',
    description: 'Traditional artwork or cultural artifact rendered in 3D, preserving cultural heritage.',
  },
  'paitkar.glb': {
    title: 'PAITKAR',
    description: 'Model representing traditional folk painting style, digitally preserved in 3D.',
  },
  'rig.glb': {
    title: 'MINING RIG',
    description: 'Heavy equipment used in mining operations for extraction and processing of materials.',
  },
  'sandvik.glb': {
    title: 'SANDVIK EQUIPMENT',
    description: 'Mining machinery manufactured by Sandvik, used for drilling, crushing, or material handling.',
  },
  'untitled.glb': {
    title: 'MINING EQUIPMENT',
    description: 'Specialized equipment used in mining operations.',
  }
};

// Function to add models to database
async function importModels() {
  try {
    // Get all files in public directory
    const files = fs.readdirSync(publicDir);
    
    // Filter for GLB files only
    const glbFiles = files.filter(file => file.toLowerCase().endsWith('.glb'));
    
    console.log(`Found ${glbFiles.length} GLB files to import`);
    
    // Process each GLB file
    for (const file of glbFiles) {
      // Check if model already exists in database
      const existingModel = await Model3D.findOne({ title: modelMetadata[file]?.title || file.split('.')[0].toUpperCase() });
      
      if (existingModel) {
        console.log(`Model ${file} already exists in database, skipping...`);
        continue;
      }
      
      // Create new model entry
      const newModel = new Model3D({
        title: modelMetadata[file]?.title || file.split('.')[0].toUpperCase(),
        description: modelMetadata[file]?.description || `3D model of ${file.split('.')[0]}`,
        modelPath: `/${file}`,
        rotation: modelMetadata[file]?.rotation || '0deg 0deg 0deg',
        poster: '/poster.png'
      });
      
      // Save model to database
      await newModel.save();
      console.log(`Added model: ${file}`);
    }
    
    console.log('Model import completed!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error importing models:', error);
    mongoose.disconnect();
  }
}

// Run the import
importModels();