import React, { useEffect, useRef, useState } from 'react';
import { loadModules } from "esri-loader";

const Map = ({ center, rotation }) => {
  const [zoom, setZoom] = useState(5);
  const [coords, setCoords] = useState([15.580926012604708, 58.41157469382408]);
  const [view, setView] = useState(null);
  const mapEl = useRef();

  useEffect(() => {

    loadModules(["esri/Map", "esri/views/MapView"]).then(([Map, MapView]) => {

      const map = new Map({
        basemap: 'gray-vector'
      });

      let view = new MapView({
        container: mapEl.current,
        map: map,
        zoom: zoom,
      });

      view.when(() => {
        setView(view);
      });

    })

    return () => {
      setView(null);
    };

  }, []);


  useEffect(() => {
    if (view && center) {
      view.center = center;
      view.rotation = rotation;
    }
  }, [center, view, rotation]);

  return (
    <div>
      <div style={{ height: 800 }} ref={mapEl} />
    </div>

  );
}

export default Map;