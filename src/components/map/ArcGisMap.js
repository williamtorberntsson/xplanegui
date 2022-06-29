import React, { useEffect, useRef, useState } from 'react';
import { loadModules } from "esri-loader";

const Map = ({ center, orientation }) => {
  const [zoom, setZoom] = useState(15);
  const [coords, setCoords] = useState([15.580926012604708, 58.41157469382408]);
  const [view, setView] = useState(null);
  const mapEl = useRef();

  useEffect(() => {

    loadModules(["esri/Map", "esri/views/SceneView"]).then(([Map, SceneView]) => {

      const map = new Map({
        basemap: 'dark-gray-vector'
      });

      let view = new SceneView({
        container: mapEl.current,
        map: map,
        zoom: zoom
      });

      view.when(() => {
        setView(view);
      });

      function shiftCamera(deg) {
        const camera = view.camera.clone();
        camera.position.longitude += deg;
        camera.heading += 90;
        return camera;
      }

    //   document.getElementById("move").addEventListener("click", () => {
    //     console.log("move")
    //     view.goTo(
    //       shiftCamera(0.1),
    //       {
    //         speedFactor: 1,
    //         easing: "linear"
    //       });
    //   })

    //   document.getElementById("tele").addEventListener("click", () => {
    //     console.log("tele")
    //     view.goTo({
    //       target: [coords[0] + 1, coords[1] + 1],
    //       heading: 100
    //     });
    //     setCoords([coords[0] + 1, coords[1] + 1])
    //   })

    })

    return () => {
      setView(null);
    };

  }, []);


  useEffect(() => {
    if (view && center) {
      view.center = center;
      view.orientation = orientation;
    }
  }, [center, view, orientation]);

  return (
    <div>
      <div style={{ height: 800 }} ref={mapEl} />
      {/* <button onClick={() => setZoom(10)}>Zoom</button>
      <button id="move">move</button>
      <button id="tele">tele</button> */}
    </div>

  );
}

export default Map;