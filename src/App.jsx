import React, { useEffect, useRef, useState } from 'react';
import '@google/model-viewer';
import ModelUploader from './components/ModelUploader';
import { modelsAPI } from './services/api';
import Login from './components/Login';
import Register from './components/Register';
import DeleteModelButton from './components/DeleteModelButton';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const modelViewerRefs = useRef({});

  // Improve the fetchModels function
  const fetchModels = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await modelsAPI.getModels();
      setModels(data);
    } catch (err) {
      console.error('Error fetching models:', err);
      setError('Failed to load models. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  // Setup AR status tracking
  useEffect(() => {
    const setupARStatus = (id, modelViewer) => {
      if (modelViewer) {
        const cornerImage = document.createElement('img');
        cornerImage.src = './path_to_your_logo.png';
        cornerImage.style.position = 'absolute';
        cornerImage.style.top = '10px';
        cornerImage.style.right = '10px';
        cornerImage.style.display = 'none';
        cornerImage.style.zIndex = '9999';
        document.body.appendChild(cornerImage);

        modelViewer.addEventListener('ar-status', (event) => {
          if (event.detail.status === 'session-started') {
            cornerImage.style.display = 'block';
          } else {
            cornerImage.style.display = 'none';
          }
        });

        modelViewer.addEventListener('ar-tracking', (event) => {
          if (event.detail.status === 'tracking') {
            cornerImage.style.display = 'block';
          } else {
            cornerImage.style.display = 'none';
          }
        });
      }
    };

    // Set up AR status for each model viewer
    Object.entries(modelViewerRefs.current).forEach(([id, ref]) => {
      if (ref) setupARStatus(id, ref);
    });
  }, [models]);

  // Add this function to handle model deletion
  const handleModelDeleted = async () => {
    await fetchModels();
  };

  return (
    <div className="w-full min-h-screen flex flex-col" style={{ margin: 0, padding: 0, overflowX: 'hidden', backgroundColor: 'rgba(139, 92, 246, 0.2)' }}>
      <div className="relative w-full flex-grow flex items-center justify-center" style={{ paddingTop: '60px' }}>
        <div className="flex flex-col items-center justify-center z-[9]">
          <img src="./logo-banner.png" className="max-w-[70vw] mb-4" alt="Logo Banner" />
          <div
            className="text-2xl font-bold"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: 'linear-gradient(to right, #8b5cf6, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            AUGMENTED REALITY GALLERY
          </div>
          
          {/* Login and Register buttons */}
          <div className="flex space-x-4">
            <Login />
            <Register />
          </div>
        </div>
      </div>

      <div className="w-full h-fit flex flex-col items-center justify-center flex-grow" style={{ marginTop: '20px' }}>
        {loading ? (
          <div className="flex items-center justify-center p-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        ) : (
          models.map((model) => (
            <div key={model._id} className="flex flex-wrap lg:flex-nowrap justify-between w-full lg:h-[500px] mt-8">
              <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
                <div
                  className="w-full h-[300px] lg:h-full bg-white rounded-lg shadow-lg overflow-hidden p-4 flex items-center justify-center"
                  style={{
                    borderRadius: '30px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                    margin: '0 auto',
                  }}
                >
                  <model-viewer
                    ref={el => modelViewerRefs.current[model._id] = el}
                    src={model.modelPath}
                    alt={model.title}
                    poster={model.poster}
                    camera-controls
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    loading="lazy"
                    rotation={model.rotation}
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'transparent',
                    }}
                    className="object-cover"
                    pixel-ratio="2"
                  ></model-viewer>
                </div>
              </div>

              <div className="w-full lg:w-1/2 relative flex items-center justify-center p-4">
                <div className="relative z-[9] flex flex-col items-center lg:items-end justify-center gap-2 p-4 w-full">
                  <div className="flex justify-between items-center w-full">
                    <div className="text-2xl md:text-4xl font-bold text-center lg:text-right">
                      {model.title}
                    </div>
                    {isAuthenticated && isAdmin && (
                      <DeleteModelButton 
                        modelId={model._id} 
                        onModelDeleted={handleModelDeleted} 
                      />
                    )}
                  </div>
                  <div className="text-md md:text-xl text-center lg:text-right font-base max-w-full lg:px-0 px-5">
                    {model.description}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Model uploader component */}
      <ModelUploader onModelAdded={fetchModels} />

      <footer
        className="w-full bg-gradient-to-r from-violet-500 to-orange-500 text-black py-4 flex flex-col items-center"
        style={{ marginBottom: 0 }}
      >
        <div className="flex items-center mb-2">
          <span className="mr-2">Powered By</span>
          <img src="./vc.png" alt="VC Logo" className="h-6" />
        </div>
        <div className="text-sm">&copy; {new Date().getFullYear()} All Rights Reserved</div>
      </footer>
    </div>
  );
};

export default App;
