import React, { useEffect, useRef, useState } from 'react';
import { loadModules } from "esri-loader";
import { myAirPlaneSvg, friendlyAirPlaneSvg, enemyAirPlaneSvg } from "../../images";
import { useXplaneData, nrAiPlanes, mapZoom } from '../../constants';

//

/**
 * Creates a map and adds points at {pointCoordinates} locations
 * @component 
 * @param {*} param0 
 * @returns 
 */
const Map = ({ myAirPlaneData, aiPlaneData, offlineData }) => {
  const [zoomvalue, setZoomvalue] = useState(mapZoom);
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
          type: "point"
        });
        let mypointGraphic = new Graphic({
          geometry: mypoint,
          symbol: myAirPlaneMarker
        });

        
        // Add points for all pointCoordinates
        let pointsArray = [] // init array to add points (markings) to
        for (let i = 0; i < nrAiPlanes; i++) {
          // Create a point
          let point = new Point({
            type: "point"
          });

          // Select symbol depending on type
          let symboltype;
          switch ("enemy" /*aiPlaneType....?*/) { // not implemented
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
        }

        // Create a view
        let view = new MapView({
          container: mapEl.current,
          map: map,
          zoom: zoomvalue,
          ui: { components: ["attribution"] } // hides default zoom buttons
        });

        // Update states when ready
        view.when(() => {
          setView(view);
          setMyPoint(mypointGraphic)  // add own airplane graphic to state
          setPoints(pointsArray)      // add all other airplane graphics to state
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

    if (useXplaneData && myAirPlaneData && aiPlaneData) {
      // Set rotation and position for camera
      try {
        view.center = [myAirPlaneData.longitude, myAirPlaneData.latitude];
        view.rotation = - myAirPlaneData.true_heading;

        layer.removeAll() // clear layer with markers

        // Update own airplane position
        let tempPoint = myPoint.clone();
        tempPoint.geometry.longitude = myAirPlaneData.longitude;  // update longitude
        tempPoint.geometry.latitude = myAirPlaneData.latitude;    // update latitude
        layer.add(tempPoint) // add updated point to layer

        // Update AI airplane positions
        points.forEach(function (point, i) {
          let tempPoint = point.clone();
          tempPoint.geometry.longitude = aiPlaneData.planes[i].longitude;  // update longitude
          tempPoint.geometry.latitude = aiPlaneData.planes[i].latitude;    // update latitude
          tempPoint.symbol.angle = aiPlaneData.planes[i].true_heading - myAirPlaneData.true_heading;     // update angle
          layer.add(tempPoint) // add edited point to layer
       //   console.log( tempPoint.symbol.angle)
        })
      } catch (error) {
        console.log(error)
      }
    }
  }, [myAirPlaneData, useXplaneData, aiPlaneData]);


  // With offline data: Updates the map and airplane positions 
  useEffect(() => {
    if (!useXplaneData && offlineData && view) {
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
      <div style={{ height: '88vh', padding: '0px', margin: '0px' }} ref={mapEl} />
    </div>
  );
}

export default Map;