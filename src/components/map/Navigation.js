
import { React, useState, useEffect } from 'react';
import ArcGisMap from './ArcGisMap';

function Nav_map() {
    const [mapCenter, setMapCenter] = useState([15.580926012604708, 58.41157469382408]);
    const [orientation, setOrientation] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMapCenter([mapCenter[0] - 0.0001, mapCenter[1] - 0.0001])
            setOrientation(orientation + 5)
            console.log(mapCenter)
        }, 1000);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    })

    const changeCenter = () => {
        setMapCenter([mapCenter[0] + 0.001, mapCenter[1] + 0.001])
    }

    return (
        <ArcGisMap center={mapCenter} orientation={orientation} />
    )
}

export default Nav_map