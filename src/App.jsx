import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import '@google/model-viewer';

const models = [
  { name: 'DUMP TRUCK', src: '/dump truck.glb', description: 'This is a mining dump truck, a heavy-duty vehicle designed to transport large volumes of materials such as ore, coal, or overburden in mining operations.' },
  { name: 'COAL TRUCK', src: '/coal truck.glb', description: 'This coal truck is used for transporting coal from mining sites to processing plants or power stations, built to handle heavy loads in rugged conditions.' },
  { name: 'EMPTY TRUCK', src: '/empty truck.glb', description: 'The empty truck is ready for loading, designed to handle a variety of heavy materials for mining or construction tasks.' },
  { name: 'DOZER', src: '/dozer.glb', description: 'The dozer is a versatile earth-moving machine used for clearing land, pushing materials, and leveling surfaces in mining and construction.' },
  { name: 'JADUPATIA ART STYLE', src: '/jadupatia.glb', description: 'Jadupatia art is a traditional folk painting practiced by the Santhal tribe, depicting stories of the afterlife, fantasy worlds, and legends of gods using natural earth tones.' },
  { name: 'KHOVAR ART STYLE', src: '/khovar.glb', description: 'Khovar is a traditional painting style from Jharkhand, often used to decorate walls during marriage ceremonies, characterized by its monochrome patterns and natural pigments.' },
  { name: 'PAITKAR ART STYLE', src: '/paitkar.glb', description: 'Paitkar is one of the oldest tribal art forms in Jharkhand, known for its narrative scroll paintings that depict scenes of mythology and local folklore using natural dyes and earth colors.' },
];

export default function ARGallery() {
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const nextModel = () => setCurrentModelIndex((prevIndex) => (prevIndex + 1) % models.length);
  const prevModel = () => setCurrentModelIndex((prevIndex) => (prevIndex - 1 + models.length) % models.length);

  const currentModel = models[currentModelIndex];

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-violet-100 to-orange-100">
      <header className="w-full pt-8 pb-4 px-4 flex flex-col items-center justify-center">
        <img src="./anukriti.png" className="max-w-[200px] mb-4" alt="Anukriti Logo" />
        <h1 className="text-3xl font-bold text-center w-full bg-gradient-to-r from-violet-600 to-orange-600 bg-clip-text text-transparent">
          AUGMENTED REALITY GALLERY
        </h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <div className="relative w-full max-w-4xl aspect-[4/3] bg-white rounded-2xl shadow-xl overflow-hidden">
          <model-viewer
            key={currentModel.src} // Ensure a new instance for each model
            src={currentModel.src}
            alt={currentModel.name}
            poster="/poster2.png"
            camera-controls
            ar
            ar-modes="webxr scene-viewer quick-look"
            loading="lazy"
            rotation="0deg 90deg 0deg"
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
            }}
            className="object-cover"
            pixel-ratio="2"
            onLoad={() => console.log(`Model ${currentModel.name} loaded`)}
            onError={(e) => console.error(`Error loading model ${currentModel.name}:`, e)}
          ></model-viewer>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pointer-events-none">
            <h2 className="text-2xl font-bold text-white">{currentModel.name}</h2>
          </div>

          <button
            onClick={prevModel}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-colors"
            aria-label="Previous model"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextModel}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-colors"
            aria-label="Next model"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-colors"
            aria-label="Toggle information"
          >
            <Info className="w-6 h-6" />
          </button>
        </div>

        {showInfo && (
          <div className="mt-6 p-4 bg-white/90 rounded-lg shadow-md max-w-2xl">
            <p className="text-gray-700">{currentModel.description}</p>
          </div>
        )}
      </main>

      <footer className="w-full bg-gradient-to-r from-violet-600 to-orange-600 text-white py-4 flex flex-col items-center">
        <div className="flex items-center mb-2">
          <span className="mr-2">Powered By</span>
          <img src="./anukriti.png" alt="VC Logo" className="h-6" />
        </div>
        <div className="text-sm">&copy; {new Date().getFullYear()} All Rights Reserved</div>
      </footer>
    </div>
  );
}