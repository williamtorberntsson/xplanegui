import React, { useEffect, useRef, useState } from 'react';
import { loadModules } from "esri-loader";

const Map = ({ center, rotation, pointPlacement}) => {
  const [zoom, setZoom] = useState(15);
  const [view, setView] = useState(null);
  const [point, setPoint] = useState(null);
  const [layer, setLayer] = useState(null);
  const mapEl = useRef();

  useEffect(() => {
    loadModules(["esri/Map", "esri/views/MapView", "esri/Graphic", "esri/layers/GraphicsLayer", "esri/geometry/Point"]).then(([Map, MapView, Graphic, GraphicsLayer, Point]) => {

      const map = new Map({
        basemap: 'gray-vector'
      });

      const graphicsLayer = new GraphicsLayer();

      map.add(graphicsLayer);

      let point = new Point({ 
        type: "point",
        longitude: pointPlacement[0],
        latitude: pointPlacement[1],
      });

      const simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],  // Orange
        outline: {
          color: [255, 255, 255], // White
          width: 1
        }
      };

      const pointGraphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol
      });

      graphicsLayer.add(pointGraphic);

      // point.latitude = 59.41157469382408;

      let view = new MapView({
        container: mapEl.current,
        map: map,
        zoom: zoom,
      });

      view.when(() => {
        setView(view);
        setPoint(point);
        // setLayer(graphicsLayer);
      });
    })

    return () => {
      setView(null);
      setPoint(null);
      // setLayer(null)
    };
  }, []);


  useEffect(() => {
    if (view && center) {
      // console.log(view.center)
      view.center = center;
      view.rotation = rotation;
    }
  }, [center, view, rotation]);

  useEffect(() => {
  if (view && pointPlacement) {
    console.log(point)
      // view.geometry.longitude = pointPlacement[0];
      // view.geometry.latitude = pointPlacement[1];
      point.latitude = pointPlacement[0];
      point.longitude = pointPlacement[1];
      
  }
  }, [view, pointPlacement]);

  return (
    <div>
      <div style={{ height: 800 }} ref={mapEl} />
    </div>

  );
}

export default Map;