import React, { useEffect, useRef } from 'react';
import '@google/model-viewer';

const App = () => {
  const modelViewerRef = useRef(null);
  const modelViewerRefCoalTruck = useRef(null);
  const modelViewerRefEmptyTruck = useRef(null);
  const modelViewerRefDozer = useRef(null);
  const modelViewerRefJadupatia = useRef(null);
  const modelViewerRefKhovar = useRef(null);
  const modelViewerRefPaitkar = useRef(null);

  useEffect(() => {
    const setupARStatus = (modelViewer) => {
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

    setupARStatus(modelViewerRef.current);
    setupARStatus(modelViewerRefCoalTruck.current);
    setupARStatus(modelViewerRefEmptyTruck.current);
    setupARStatus(modelViewerRefDozer.current);
    setupARStatus(modelViewerRefJadupatia.current);
    setupARStatus(modelViewerRefKhovar.current);
    setupARStatus(modelViewerRefPaitkar.current);
  }, []);

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
        </div>
      </div>

      <div className="w-full h-fit flex flex-col items-center justify-center flex-grow" style={{ marginTop: '20px' }}>

        {/* Model Viewer 1: Dump Truck */}
        <div className="flex flex-wrap lg:flex-nowrap justify-between w-full lg:h-[500px]">
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
                ref={modelViewerRef}
                src="/dump truck.glb"
                alt="Dump Truck"
                poster="/poster.png"
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
              ></model-viewer>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative flex items-center justify-center p-4">
            <div className="relative z-[9] flex flex-col items-center lg:items-end justify-center gap-2 p-4">
              <div className="text-2xl md:text-4xl font-bold text-center lg:text-right">
                DUMP TRUCK
              </div>
              <div className="text-md md:text-xl text-center lg:text-right font-base max-w-full lg:px-0 px-5">
                This is a mining dump truck, a heavy-duty vehicle designed to
                transport large volumes of materials such as ore, coal, or
                overburden in mining operations.
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap justify-between w-full lg:h-[500px] mt-8">
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
                ref={modelViewerRefCoalTruck}
                src="/coal truck.glb"
                alt="Coal Truck"
                poster="/poster.png"
                camera-controls
                ar
                ar-modes="webxr scene-viewer quick-look"
                loading="lazy"
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
            <div className="relative z-[9] flex flex-col items-center lg:items-end justify-center gap-2 p-4">
              <div className="text-2xl md:text-4xl font-bold text-center lg:text-right">
                COAL TRUCK
              </div>
              <div className="text-md md:text-xl text-center lg:text-right font-base max-w-full lg:px-0 px-5">
                This coal truck is used for transporting coal from mining sites
                to processing plants or power stations, built to handle heavy
                loads in rugged conditions.
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap justify-between w-full lg:h-[500px] mt-8">
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
                ref={modelViewerRefEmptyTruck}
                src="/empty truck.glb"
                alt="Empty Truck"
                poster="/poster.png"
                camera-controls
                ar
                ar-modes="webxr scene-viewer quick-look"
                loading="lazy"
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
            <div className="relative z-[9] flex flex-col items-center lg:items-end justify-center gap-2 p-4">
              <div className="text-2xl md:text-4xl font-bold text-center lg:text-right">
                EMPTY TRUCK
              </div>
              <div className="text-md md:text-xl text-center lg:text-right font-base max-w-full lg:px-0 px-5">
                The empty truck is ready for loading, designed to handle a
                variety of heavy materials for mining or construction tasks.
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap justify-between w-full lg:h-[500px] mt-8">
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
                ref={modelViewerRefDozer}
                src="/dozer.glb"
                alt="Dozer"
                poster="/poster.png"
                camera-controls
                ar
                ar-modes="webxr scene-viewer quick-look"
                loading="lazy"
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
            <div className="relative z-[9] flex flex-col items-center lg:items-end justify-center gap-2 p-4">
              <div className="text-2xl md:text-4xl font-bold text-center lg:text-right">
                DOZER
              </div>
              <div className="text-md md:text-xl text-center lg:text-right font-base max-w-full lg:px-0 px-5">
                The dozer is a versatile earth-moving machine used for clearing
                land, pushing materials, and leveling surfaces in mining and
                construction.
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap justify-between w-full lg:h-[500px] mt-8">
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
                ref={modelViewerRefJadupatia}
                src="/jadupatia.glb"
                alt="Jadupatia Art Style"
                poster="/poster.png"
                camera-controls
                ar
                ar-modes="webxr scene-viewer quick-look"
                loading="lazy"
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
            <div className="relative z-[9] flex flex-col items-center lg:items-end justify-center gap-2 p-4">
              <div className="text-2xl md:text-4xl font-bold text-center lg:text-right">
                JADUPATIA ART STYLE
              </div>
              <div className="text-md md:text-xl text-center lg:text-right font-base max-w-full lg:px-0 px-5">
                Jadupatia art is a traditional folk painting practiced by the
                Santhal tribe, depicting stories of the afterlife, fantasy
                worlds, and legends of gods using natural earth tones.
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap justify-between w-full lg:h-[500px] mt-8">
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
                ref={modelViewerRefKhovar}
                src="/khovar.glb"
                alt="Khovar Art Style"
                poster="/poster.png"
                camera-controls
                ar
                ar-modes="webxr scene-viewer quick-look"
                loading="lazy"
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
            <div className="relative z-[9] flex flex-col items-center lg:items-end justify-center gap-2 p-4">
              <div className="text-2xl md:text-4xl font-bold text-center lg:text-right">
                KHOVAR ART STYLE
              </div>
              <div className="text-md md:text-xl text-center lg:text-right font-base max-w-full lg:px-0 px-5">
                Khovar is a traditional painting style from Jharkhand, often
                used to decorate walls during marriage ceremonies,
                characterized by its monochrome patterns and natural pigments.
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap justify-between w-full lg:h-[500px] mt-8">
          <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
            <div
              className="w-full h-[300px] lg:h-full bg-white rounded-lg shadow-lg overflow-hidden p-4 flex items-center justify-center gradient-border"
              style={{
                borderRadius: '30px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                margin: '0 auto',
              }}
            >
              <model-viewer
                ref={modelViewerRefPaitkar}
                src="/paitkar.glb"
                alt="Paitkar Art Style"
                poster="/poster.png"
                camera-controls
                ar
                ar-modes="webxr scene-viewer quick-look"
                loading="lazy"
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
            <div className="relative z-[9] flex flex-col items-center lg:items-end justify-center gap-2 p-4">
              <div className="text-2xl md:text-4xl font-bold text-center lg:text-right">
                PAITKAR ART STYLE
              </div>
              <div className="text-md md:text-xl text-center lg:text-right font-base max-w-full lg:px-0 px-5">
                Paitkar is one of the oldest tribal art forms in Jharkhand,
                known for its narrative scroll paintings that depict scenes of
                mythology and local folklore using natural dyes and earth
                colors.
              </div>
            </div>
          </div>
        </div>
      </div>

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
