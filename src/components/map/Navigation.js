
import { React, useState, useEffect } from 'react';
import ArcGisMap from './ArcGisMap';

function Nav_map() {
    const [mapCenter, setMapCenter] = useState([15.580926012604708, 58.41157469382408]);
    const [mapRotation, setMapRotation] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMapCenter([mapCenter[0] - 0.1, mapCenter[1] - 0.01])
            setMapRotation(mapRotation + 0.1)
            console.log(mapCenter)
        }, 10);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    })

    return (
        <ArcGisMap center={mapCenter} rotation={mapRotation} />
    )
}

export default Nav_map