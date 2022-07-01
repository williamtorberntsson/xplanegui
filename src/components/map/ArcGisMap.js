import React, { useEffect, useRef, useState } from 'react';
import { loadModules } from "esri-loader";
import { myAirPlaneSvg, friendlyAirPlaneSvg, enemyAirPlaneSvg } from "../../images";

// Creates a map and adds points at {pointCoordinates} locations
const Map = ({ zoom, useXplaneData, myAirPlaneData, offlineData }) => {
  const [zoomvalue, setZoomvalue] = useState(zoom);
  const [view, setView] = useState(null);
  const [myPoint, setMyPoint] = useState(null);
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

        // Add point for own airplane
        let mypoint = new Point({
          type: "point",
          //longitude: coord.long,
          //latitude: coord.lat,
        });
        let mypointGraphic = new Graphic({
          geometry: mypoint,
          symbol: myAirPlaneMarker
        });


        /*
        let pointsArray = [] // init array to add points (markings) to

        // Add points for all pointCoordinates
        pointCoordinates.forEach(function (coord, i) {
          // Create a point
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
        */

        // Create a view
        let view = new MapView({
          container: mapEl.current,
          map: map,
          zoom: zoomvalue,
          ui: { components: ["attribution"] } // hides zoom buttons
        });

        // Update states when ready
        view.when(() => {
          setView(view);
          setMyPoint(mypointGraphic)
          //setPoints(pointsArray)
          setLayer(graphicsLayer);
        });
      })

    return () => {
      setView(null);
      setMyPoint(null);
      setPoints(null);
      setLayer(null);
    };
  }, []);

  // With xplane data: Updates the map and airplane positions 
  useEffect(() => {

    if (useXplaneData && myAirPlaneData) {
      // Set rotation and position for camera
      try {
        view.center = [myAirPlaneData.longitude, myAirPlaneData.latitude];
        view.rotation = - myAirPlaneData.heading;

        layer.removeAll() // clear layer with markers

        // Update own airplane position
        let tempPoint = myPoint.clone();
        tempPoint.geometry.longitude = myAirPlaneData.longitude;  // update longitude
        tempPoint.geometry.latitude = myAirPlaneData.latitude;    // update latitude
        layer.add(tempPoint) // add updated point to layer

        /* // Update other positions
        points.forEach(function (point, i) {
          let tempPoint = point.clone();
          tempPoint.geometry.longitude = pointCoordinates[i].long;  // update longitude
          tempPoint.geometry.latitude = pointCoordinates[i].lat;    // update latitude
          tempPoint.geometry.angle = pointCoordinates[i].angle;     // update angle
          tempPoint.geometry.type = pointCoordinates[i].type;       // update type
          layer.add(tempPoint) // add edited point to layer
        }) */
      } catch (error) {
        console.log(error)
      }
    }
  }, [myAirPlaneData, useXplaneData]);


  // With offline data: Updates the map and airplane positions 
  useEffect(() => {
    console.log("hej")
    if (!useXplaneData && offlineData && view) {
      console.log(offlineData.longitude)
      // Set rotation and position for camera
      view.center = [offlineData.longitude, offlineData.latitude];
      view.rotation = offlineData.heading;

      layer.removeAll() // clear layer with markers

      // Update own airplane position
      let tempPoint = myPoint.clone();
      tempPoint.geometry.longitude = offlineData.longitude;  // update longitude
      tempPoint.geometry.latitude = offlineData.latitude;    // update latitude
      tempPoint.geometry.angle = offlineData.heading;        // update angle
      layer.add(tempPoint) // add updated point to layer
    }
  }, [offlineData])

  return (
    <div>
      <div style={{ height: 900 }} ref={mapEl} />
    </div>
  );
}

export default Map;