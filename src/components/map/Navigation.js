
import { React, useState, useEffect } from 'react';
import ArcGisMap from './ArcGisMap';

function Nav_map() {
    const [mapCenter, setMapCenter] = useState([]);
    const [mapRotation, setMapRotation] = useState(0);
    const [pointCoords, setPointCoords] = useState([15.580926012604708, 58.41157469382408]);
    const [data, setData] = useState([{}])


    useEffect(()=> {
        fetch("/plane").then(
          res => res.json()
        ).then(
          data => {
            setData(data)
            console.log(data.positions)
          }
        )
      })

    useEffect(() => {
        const interval = setInterval(() => {
            setMapCenter([mapCenter[0] - 0, mapCenter[1] - 0])
            setMapRotation(mapRotation + 0.0)
            setPointCoords([pointCoords[0] + 0.001, pointCoords[1] - 0.001])
            // console.log(mapCenter)
        }, 100);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  })

    return (
        <ArcGisMap center={data.positions} pointPlacement={pointCoords} />
    )
}

export default Nav_map