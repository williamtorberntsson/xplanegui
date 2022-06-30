
import { React, useState, useEffect } from 'react';
import ArcGisMap from './ArcGisMap';

function Nav_map() {
  const [mapCenter, setMapCenter] = useState([15.580926012604708, 58.41157469382408]);
  const [mapRotation, setMapRotation] = useState(0);
  const [pointCoords, setPointCoords] = useState([
    [15.580926012604708, 58.41157469382408, "me"],
    [15.680926012604708, 58.51157469382408, "friend"],
    [15.780926012604708, 58.61157469382408, "enemy"],
    [15.880926012604708, 58.31157469382408, "enemy"],
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMapCenter([pointCoords[0][0], pointCoords[0][1]])
      setMapRotation(mapRotation + 0.0)
      setPointCoords([
        [pointCoords[0][0] + 0.001, pointCoords[0][1] - 0.002],
        [pointCoords[1][0] + 0.001, pointCoords[1][1] + 0.001],
        [pointCoords[2][0] - 0.001, pointCoords[2][1] + 0.001],
        [pointCoords[3][0] + 0.003, pointCoords[3][1] - 0.001]
      ])
    }, 20);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  })

  return (
    <ArcGisMap center={mapCenter} zoom={7} rotation={mapRotation} pointCoordinates={pointCoords} />
  )
}

export default Nav_map