import React, { useEffect, useRef, useState } from 'react';
import { loadModules } from "esri-loader";
import { colors } from '@mui/material';

// Creates a map and adds points at {pointCoordinates} locations
const Map = ({ center, rotation, zoom, pointCoordinates }) => {
  const [zoomvalue, setZoomvalue] = useState(zoom);
  const [view, setView] = useState(null);
  const [points, setPoints] = useState(null);
  const [layer, setLayer] = useState(null);
  const mapEl = useRef();

  useEffect(() => {
    loadModules(["esri/Map",
      "esri/views/MapView",
      "esri/Graphic",
      "esri/layers/GraphicsLayer",
      "esri/geometry/Point"]).then(([Map, MapView, Graphic, GraphicsLayer, Point]) => {

        const map = new Map({
          basemap: 'gray-vector'
        });

        const graphicsLayer = new GraphicsLayer();

        map.add(graphicsLayer);

        const simpleMarkerSymbol = {
          type: "simple-marker",
          color: [226, 119, 40],  // Orange
          outline: {
            color: [255, 255, 255], // White
            width: 1
          }
        };

        let pointsArray = [] // init array to add points to

        pointCoordinates.forEach(function (coord, i) {
          // create a point
          let point = new Point({
            type: "point",
            longitude: coord[0],
            latitude: coord[1],
          });
          // create a graphic with the point
          let pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol
          });

          pointsArray.push(pointGraphic) // add graphic to array
        });

        let view = new MapView({
          container: mapEl.current,
          map: map,
          zoom: zoomvalue,
        });

        view.when(() => {
          setView(view);
          setPoints(pointsArray)
          setLayer(graphicsLayer);
        });
      })

    return () => {
      setView(null);
      setPoints(null);
      setLayer(null);
    };
  }, []);

  // updates the map and all points
  useEffect(() => {
    if (view && center) {
      view.center = center;
      view.rotation = rotation;
    }

    if (points && pointCoordinates) {
      layer.removeAll(); // clear graphics

      // clone and edit point for each coordinate
      points.forEach(function (point, i) {
        let tempPoint = point.clone();
        tempPoint.geometry.longitude = pointCoordinates[i][0];
        tempPoint.geometry.latitude = pointCoordinates[i][1];
        layer.add(tempPoint) // add edited point to layer
      })
    }

  }, [center, rotation, pointCoordinates]);

  return (
    <div>
      <div style={{ height: 900 }} ref={mapEl} />
    </div>

  );
}

export default Map;