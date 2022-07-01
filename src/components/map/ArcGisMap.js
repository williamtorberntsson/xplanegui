import React, { useEffect, useRef, useState } from 'react';
import { loadModules } from "esri-loader";
import { myAirPlaneSvg, friendlyAirPlaneSvg, enemyAirPlaneSvg } from "../../images";

// Creates a map and adds points at {pointCoordinates} locations
const Map = ({ center ,rotation, zoom, pointCoordinates }) => {
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
      "esri/geometry/Point",
      "esri/symbols/PictureMarkerSymbol"]).then(([Map, MapView, Graphic, GraphicsLayer, Point, PictureMarkerSymbol]) => {

        const map = new Map({
          basemap: 'gray-vector'
        });

        const graphicsLayer = new GraphicsLayer();

        map.add(graphicsLayer);


        // Creating markers for different airplanes
        const myAirPlaneMarker = {
          type: "picture-marker",
          url: myAirPlaneSvg,
          angle: 0,
          width: "20px",
          height: "20px"
        };

        const enemyAirPlaneMarker = {
          type: "picture-marker",
          url: enemyAirPlaneSvg,
          angle: 0,
          width: "20px",
          height: "20px"
        };

        const friendlyAirPlaneMarker = {
          type: "picture-marker",
          url: friendlyAirPlaneSvg,
          angle: 0,
          width: "20px",
          height: "20px"
        };


        let pointsArray = [] // init array to add points (markings) to

        // Add points for all pointCoordinates
        pointCoordinates.forEach(function (coord, i) {
          // Create a point
          console.log(coord.long, coord.lat, coord.type)
          let point = new Point({
            type: "point",
            longitude: coord.long,
            latitude: coord.lat,
          });

          // Select symbol depending on type
          let symboltype;
          switch (coord.type) {
            case "me":
              symboltype = myAirPlaneMarker
              break;
            case "friendly":
              symboltype = friendlyAirPlaneMarker
              break;
            case "enemy":
              symboltype = enemyAirPlaneMarker
              break;
            default:
              symboltype = enemyAirPlaneMarker
          }
          // create a graphic with the point
          let pointGraphic = new Graphic({
            geometry: point,
            symbol: symboltype
          });

          pointsArray.push(pointGraphic) // add graphic to array
        });

        // Create a view
        let view = new MapView({
          container: mapEl.current,
          map: map,
          zoom: zoomvalue,
          ui: {
            components: ["attribution"] // hides zoom buttons
          }
        });

        // Update states when ready
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

  // const distanceToCenter = 0.8
  // const offset = [-1.6*distanceToCenter * Math.sin(mapRotation * Math.PI / 180), distanceToCenter * Math.cos(mapRotation * Math.PI / 180)];
  // setMapCenter([pointCoords[0].long + offset[0], pointCoords[0].lat + offset[1]])

  // updates the map and all points
  useEffect(() => {
    if (view && center) {
      console.log(view.center)
      view.center = center;
      view.rotation = rotation;
    }

    if (points && pointCoordinates) {
      layer.removeAll(); // clear graphics

      // clone and edit point for each coordinate
      points.forEach(function (point, i) {
        let tempPoint = point.clone();
        tempPoint.geometry.longitude = pointCoordinates[i].long;  // update longitude
        tempPoint.geometry.latitude = pointCoordinates[i].lat;    // update latitude
        tempPoint.geometry.angle = pointCoordinates[i].angle;     // update angle
        tempPoint.geometry.type = pointCoordinates[i].type;       // update type
        layer.add(tempPoint) // add edited point to layer
      })
    }

  }, [center, rotation, pointCoordinates]);

  return (
    <div>
      <div style={{ height: '88vh', padding: '0px', margin: '0px' }} ref={mapEl} />
    </div>

  );
}

export default Map;