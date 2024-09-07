import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import 'ar.js/three.js/build/ar.js';

const ARViewer = () => {
  const arContainerRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera, arToolkitSource, arToolkitContext, markerRoot;

    const init = () => {
      scene = new THREE.Scene();

      camera = new THREE.Camera();
      scene.add(camera);

    //Initializing the renderer

      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      arContainerRef.current.appendChild(renderer.domElement);

      arToolkitSource = new THREE.ArToolkitSource({ sourceType: 'webcam' });

      arToolkitSource.init(() => {
        setTimeout(() => {
          arToolkitSource.onResizeElement();
          arToolkitSource.copyElementSizeTo(renderer.domElement);
          if (arToolkitContext.arController !== null) {
            arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
          }
        }, 2000);
      });

      arToolkitContext = new THREE.ArToolkitContext({
        cameraParametersUrl: 'data/camera_para.dat',
        detectionMode: 'mono',
      });

      arToolkitContext.init(() => {
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
      });

      markerRoot = new THREE.Group();
      scene.add(markerRoot);
      let markerControls = new THREE.ArMarkerControls(arToolkitContext, markerRoot, {
        type: 'pattern',
        patternUrl: 'data/patt.hiro',
        changeMatrixMode: 'modelViewMatrix',
      });

      // Loading the model here
      const loader = new GLTFLoader();
      loader.load('/Astronaut.glb', (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5); // Adjust the scale if necessary
        model.position.set(0, 0.5, 0); // Adjust the position if necessary
        markerRoot.add(model);
      });

      const render = () => {
        requestAnimationFrame(render);
        if (arToolkitSource.ready) {
          arToolkitContext.update(arToolkitSource.domElement);
        }
        renderer.render(scene, camera);
      };

      render();
    };

    init();

    return () => {
      
      //CLEANING UP!!

        if (renderer) {
        renderer.dispose();
      }
      if (arToolkitSource) {
        arToolkitSource.dispose();
      }
      if (arToolkitContext) {
        arToolkitContext.dispose();
      }
    };
  }, []);

  return <div ref={arContainerRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default ARViewer;
