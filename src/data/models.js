export const models = [
  {
    id: "dump-truck",
    title: "DUMP TRUCK",
    description: "This is a mining dump truck, a heavy-duty vehicle designed to transport large volumes of materials such as ore, coal, or overburden in mining operations.",
    modelPath: "/dump truck.glb",
    poster: "/poster.png",
    rotation: "0deg 90deg 0deg"
  },
  {
    id: "coal-truck",
    title: "COAL TRUCK",
    description: "This coal truck is used for transporting coal from mining sites to processing plants or power stations, built to handle heavy loads in rugged conditions.",
    modelPath: "/coal truck.glb",
    poster: "/poster.png"
  },
  // Additional models...
];

// Functions to manage models
export const addModel = (model) => {
  models.push({
    id: model.id || model.title.toLowerCase().replace(/\s+/g, '-'),
    ...model
  });
  
  // If using local storage for persistence
  localStorage.setItem('ar-viewer-models', JSON.stringify(models));
  return models;
};

// Load models from storage on init
export const initModels = () => {
  const storedModels = localStorage.getItem('ar-viewer-models');
  if (storedModels) {
    // Replace the default models with stored ones
    models.splice(0, models.length, ...JSON.parse(storedModels));
  }
};