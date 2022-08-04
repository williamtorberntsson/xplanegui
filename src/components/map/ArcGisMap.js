import React, { useEffect, useRef, useState } from 'react';
import { loadModules } from "esri-loader";
import { myAirPlaneSvg, neutralAirPlaneSvg, friendlyAirPlaneSvg, enemyAirPlaneSvg } from "../../images";
import { NR_AI_PLANES, MAP_ZOOM } from '../../settings';
import haversine from "../haversine";

/**
 * Creates a map and shows other airplanes from xplanes.
 * @component
 * @category Map
 * @param {*} param0
 * @returns map
 */
const Map = ({ myAirPlaneData, aiPlaneData }) => {
  const [zoomvalue, setZoomvalue] = useState(MAP_ZOOM);
  const [view, setView] = useState(null);
  const [myPoint, setMyPoint] = useState(null);
  const [points, setPoints] = useState(null);
  const [layer, setLayer] = useState(null);
  const mapEl = useRef();

  // Creating markers for different airplanes
  const myAirPlaneMarker = {
    type: "picture-marker",
    url: myAirPlaneSvg,
    angle: 0,
    width: "20px",
    height: "20px"
  };

  const neutralAirPlaneMarker = {
    type: "picture-marker",
    url: neutralAirPlaneSvg,
    angle: 0,
    width: "20px",
    height: "20px"
  };


  const enemyAirPlaneMarker = {
    type: "picture-marker",
    url: enemyAirPlaneSvg,
    angle: 0,
    width: "20px",
    height: "20px",
  };

  const friendlyAirPlaneMarker = {
    type: "picture-marker",
    url: friendlyAirPlaneSvg,
    angle: 0,
    width: "20px",
    height: "20px"
  };

  useEffect(() => {
    loadModules(["esri/Map",
      "esri/views/MapView",
      "esri/Graphic",
      "esri/layers/GraphicsLayer",
      "esri/geometry/Point",
      "esri/symbols/PictureMarkerSymbol",
      "esri/PopupTemplate",
      "esri/popup/FieldInfo"]).then(([Map, MapView, Graphic, GraphicsLayer, Point, PictureMarkerSymbol, PopupTemplate, FieldInfo]) => {

        const map = new Map({
          basemap: 'gray-vector'
        });

        // Create a view
        let view = new MapView({
          container: mapEl.current,
          map: map,
          zoom: zoomvalue,
          ui: { components: ["attribution"] }, // hides default zoom buttons
          constraints: {
            rotationEnabled: false
          }
        })

        view.on("drag", function(event){
          // prevents panning with the mouse drag event
          event.stopPropagation();
        });

        view.on("key-down", function(event){
          // prevents panning with the arrow keys
          var keyPressed = event.key;
          if(keyPressed.slice(0,5) === "Arrow"){
            event.stopPropagation();
          }
        });

        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        // Add point for own airplane
        let mypoint = new Point({
          type: "point"
        });

        let mypointGraphic = new Graphic({
          geometry: mypoint,
          symbol: myAirPlaneMarker,
        });


        // Add points for all pointCoordinates
        let pointsArray = [] // init array to add points (markings) to
        for (let i = 0; i < NR_AI_PLANES; i++) {
          // Create a point
          var point = new Point({
            type: "point",
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

          var template = new PopupTemplate({
            declaredClass: JSON.stringify(i),
            title: "Name not found",
            content: "Content not found",
            overwriteActions: true,
          });

          // create a graphic with the point
          var pointGraphic = new Graphic({
            geometry: point,
            symbol: symboltype,
            popupTemplate: template
          });
          pointsArray.push(pointGraphic) // add graphic to array
        }

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

    if (myAirPlaneData && aiPlaneData) {
      // Set rotation and position for camera
      try {
        view.center = [myAirPlaneData.longitude, myAirPlaneData.latitude];
        view.rotation = - myAirPlaneData.true_heading;

        layer.removeAll() // clear layer with markers

        // Update own airplane position
        let tempPoint = myPoint.clone();
        console.log("heading: ", myAirPlaneData.true_heading)
        tempPoint.geometry.longitude = myAirPlaneData.longitude;  // update longitude
        tempPoint.geometry.latitude = myAirPlaneData.latitude;    // update latitude
        layer.add(tempPoint) // add updated point to layer

        // Update AI airplane positions
        points.forEach(function (point, i) {
          let tempPoint = point.clone();
          tempPoint.geometry.longitude = aiPlaneData.planes[i].longitude;  // update longitude
          tempPoint.geometry.latitude = aiPlaneData.planes[i].latitude;    // update latitude

          // Set correct symbol type
          switch (aiPlaneData.planes[i].team_status) {
            case 0:
              tempPoint.symbol = neutralAirPlaneMarker;
              break;
            case 1:
              tempPoint.symbol = friendlyAirPlaneMarker;
              break;
            case 2:
              tempPoint.symbol = enemyAirPlaneMarker;
              break;
            default:
              tempPoint.symbol = neutralAirPlaneMarker;
          }
          tempPoint.symbol.angle = aiPlaneData.planes[i].true_heading - myAirPlaneData.true_heading;     // update angle

          tempPoint.popupTemplate.title = 'CGI modell' + JSON.stringify(i+1);
          if (view.popup.title === 'CGI modell' + JSON.stringify(i+1)) { // Något attribut som är unikt för varje pop-up/plan
            view.popup.location = { longitude: aiPlaneData.planes[i].longitude, latitude: aiPlaneData.planes[i].latitude };
          }

          const distance = haversine(myAirPlaneData.latitude, myAirPlaneData.longitude, aiPlaneData.planes[i].latitude, aiPlaneData.planes[i].longitude)

          tempPoint.popupTemplate.content = (
            "<ul><li> ALTITUDE: " + Number(aiPlaneData.planes[i].altitude).toFixed(0) + " feet</li>" +
            "<li>DISTANCE:" + distance + " m</li>" +
            "<li>SOMETHING: </li><ul>")

          view.popup.visibleElements.featureNavigation = false;

          layer.add(tempPoint) // add edited point to layer
        })
      } catch (error) {
        console.log(error)
      }
    }
  }, [myAirPlaneData, aiPlaneData]);

  return (
    <div>
      <div style={{ height: '88vh', padding: '0px', margin: '0px' }} ref={mapEl} />
    </div>
  );
}

export default Map;