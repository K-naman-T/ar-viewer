import { Camera, X } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';

const CameraComponent = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  const startCamera = async () => {
    setCameraActive(true);
    setIsLoading(true);
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(newStream);
      setIsLoading(false);
    } catch (err) {
      console.error("Error accessing camera: ", err);
      setCameraActive(false);
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    setCameraActive(false);
    if (videoRef.current && videoRef.current.srcObject) {
      console.log("Stopping video");
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setStream(null);
    }
  };

  useEffect(() => {
    if (cameraActive && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      console.log('Camera started, stream set to video element.');
    }
  }, [cameraActive, stream]);

  return (
    <div className="relative z-[10]">
      <button
        onClick={startCamera}
        className="absolute text-white bg-[#F45959] shadow-lg top-0 right-0 p-2 m-3 rounded-full"
      >
        <Camera stroke='white' size={20}/>
      </button>
      {cameraActive && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[10]">
          <div className="relative w-full h-full">
            <button
              onClick={stopCamera}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 z-[12]"
            >
              <X />
            </button>
            {isLoading && (
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="spinner"></div> {/* Replace with your loading spinner */}
              </div>
            )}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className={`absolute inset-0 w-full h-full object-contain transform ${isLoading ? 'hidden' : 'scale-x-[-1]'}`}
            ></video>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraComponent;
