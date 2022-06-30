import React, { useEffect, useRef, useState } from 'react';
import { loadModules } from "esri-loader";

const Map = ({ center, rotation, pointPlacement }) => {
  const [zoom, setZoom] = useState(4);
  const [view, setView] = useState(null);
  const [point, setPoint] = useState(null);
  const [point2, setPoint2] = useState(null);
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

        let aPoint = new Point({
          type: "point",
          longitude: pointPlacement[0],
          latitude: pointPlacement[1],
        });

        let bPoint = new Point({
          type: "point",
          longitude: pointPlacement[0] + 0.1,
          latitude: pointPlacement[1] + 0.1,
        })

        const simpleMarkerSymbol = {
          type: "simple-marker",
          color: [226, 119, 40],  // Orange
          outline: {
            color: [255, 255, 255], // White
            width: 1
          }
        };

        let pointGraphicA = new Graphic({
          geometry: aPoint,
          symbol: simpleMarkerSymbol
        });

        let pointGraphicB = new Graphic({
          geometry: bPoint,
          symbol: simpleMarkerSymbol
        });

        graphicsLayer.addMany(pointGraphicA, pointGraphicB);

        // point.latitude = 59.41157469382408;

        let view = new MapView({
          container: mapEl.current,
          map: map,
          zoom: zoom,
        });

        view.when(() => {
          setView(view);
          setPoint(pointGraphicA);
          setPoint2(pointGraphicB);
          setLayer(graphicsLayer);
        });
      })

    return () => {
      setView(null);
      setPoint(null);
      setPoint2(null)
      setLayer(null)
    };
  }, []);


  useEffect(() => {
    if (view && center) {
      view.center = center;
      view.rotation = rotation;
    }

    if (point && pointPlacement) {
      // console.log(point)
      point.geometry.latitude = pointPlacement[1];
      point.geometry.longitude = pointPlacement[0];

      point2.geometry.latitude = pointPlacement[1] - 0.1;
      point2.geometry.longitude = pointPlacement[0] - 0.1;
      // layer.geometry = point;
      layer.add(point)
      layer.add(point2)

    }
  }, [center, rotation, pointPlacement]);

  return (
    <div>
      <div style={{ height: 900 }} ref={mapEl} />
    </div>

  );
}

export default Map;