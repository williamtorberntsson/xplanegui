import React, { useState, useEffect, useRef } from "react";
import "./WAD.css";
import "./leaflet.css";
import L from 'leaflet';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { latLng } from "leaflet";
import arrowTarget from '../assets/img/mapIcons/arrowTarget.png'
import arrow from '../assets/img/mapIcons/arrowMe.png'
import { positions } from "@mui/system";
import { marker } from "leaflet";

const defaultZoom = 10;

const MovingTargets = () => {
  const [coords, setCoords] = useState([59.317298, 18.043223]); //Target coordinates

  const map = useMap()

  var target = L.icon({
    iconUrl: arrowTarget,
    iconSize: [15, 20], // size of the icon
    // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCoords([coords[0] + 0.0001, coords[1] + 0.001]);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <Marker position={coords} icon={target}></Marker>
  )
}

const WAD = () => {
  const startPos = [59.317298, 18.043223]



  return (
    <Map startPos={startPos} />
  )

}

const Navigate = () => {
  const [coords, setCoords] = useState([59.317298, 18.043223]); //Start coordinates

  useEffect(() => {
    const interval = setInterval(() => {
      setCoords([coords[0] - 0.001, coords[1] + 0.001]);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  });


  const map = useMap()

  useEffect(() => {
    map.flyTo(coords)
    map.setView(coords)
    // console.log(coords)
  }, [coords])
  return null
}

const Map = ({ startPos }) => {


  return (
    <MapContainer center={startPos} zoom={defaultZoom} >
      <TileLayer
        url='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
        attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
      />
      <Navigate></Navigate>
      <MovingTargets></MovingTargets>
    </MapContainer>

  )
}

export default WAD;