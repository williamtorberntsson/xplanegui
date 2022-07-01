
import { React, useState, useEffect } from 'react';
import ArcGisMap from './ArcGisMap';

function Nav_map() {
  const [mapCenter, setMapCenter] = useState([15.580926012604708, 58.41157469382408]);
  const [mapRotation, setMapRotation] = useState(0);
  const [data, setData] = useState([{}]);
  const [pointCoords, setPointCoords] = useState([
    {
      long: 15.680926012604708,
      lat: 58.41157469382408,
      type: "me",
      angle: 0
    },
    // {
    //   long: 15.780926012604708,
    //   lat: 58.41157469382408,
    //   type: "friendly",
    //   angle: 0
    // },
    // {
    //   long: 15.480926012604708,
    //   lat: 58.41157469382408,
    //   type: "enemy",
    //   angle: 0
    // },
    // {
    //   long: 15.480926012604708,
    //   lat: 58.51157469382408,
    //   type: "enemy",
    //   angle: 0
    // },
  ]);

  useEffect(()=> {
    fetch("/plane").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        setPointCoords({...pointCoords, long: data.positions[0], lat: data.positions[1]})
        console.log(data.positions)
      }
    )
  })

  // useEffect(() => {
  //   const interval = setInterval(() => {

  //     // Make sure plane is center when rotating map

  //     const distanceToCenter = 0.8
  //     const offset = [-1.6*distanceToCenter * Math.sin(mapRotation * Math.PI / 180), distanceToCenter * Math.cos(mapRotation * Math.PI / 180)];
  //     setMapCenter([pointCoords[0].long + offset[0], pointCoords[0].lat + offset[1]])
      
  //     let tempcoords = pointCoords;

  //     tempcoords[0].long = data.positions[0];
  //     tempcoords[0].lat = data.positions[1];
  //     tempcoords[1].long += 0.0001;
  //     tempcoords[1].lat += 0.0001;
  //     tempcoords[2].long -= 0.0001;
  //     tempcoords[2].lat += 0.0001;
  //     tempcoords[3].long += 0.0003;
  //     tempcoords[3].lat -= 0.0001;

  //     setPointCoords(tempcoords)
  //   }, 20);

  //   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // })

  return (
    <ArcGisMap center={data.positions} zoom={3} rotation={data.heading} pointCoordinates={pointCoords} />
  )
}

export default Nav_map