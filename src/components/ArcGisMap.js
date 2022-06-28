import React, { useEffect, useRef, useState } from 'react';
import { loadModules } from "esri-loader";

const Map = () => {
  const [zoom, setZoom] = useState(4);
  const [coords, setCoords] = useState([-118.24, 34.05])


  let view;

  loadModules(["esri/Map", "esri/views/SceneView"]).then(([Map, SceneView]) => {
    const map = new Map({
      basemap: 'dark-gray-vector'
    });

    view = new SceneView({
      container: "viewDiv",
      map: map,
      zoom: 4
    });

    function shiftCamera(deg) {
      const camera = view.camera.clone();
      camera.position.longitude += deg;
      return camera;
    }

    document.getElementById("move").addEventListener("click", () => {
      console.log("move")
      view.goTo(
        shiftCamera(0.1),
        {
          speedFactor: 1,
          easing: "linear"
        });
    })
  });

  return (
    <div>
      <div style={{ height: 800 }} id="viewDiv" />
      <button onClick={() => setZoom(10)}>Zoom</button>
      <button id="move">move</button>
    </div>

  );
}

export default Map;