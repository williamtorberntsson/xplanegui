import { React, useState, useEffect } from 'react';
import ArcGisMap from './ArcGisMap';
import UpdateOfflineData from './UpdateOfflineData';

function Nav_map({ useXplaneData, parentCallback }) {
  const [myAirPlaneData, setMyAirPlaneData] = useState();
  const [offlineData, setOfflineData] = useState(null);

  // Use myAirPlaneData from xplane
  useEffect(() => {
    if (useXplaneData) {
      fetch("/plane").then(
        res => res.json()
      ).then(
        myAirPlaneData => {
          setMyAirPlaneData(myAirPlaneData)
          parentCallback(myAirPlaneData)
        }
      )
    }
  })

  // Use offline data
  useEffect(() => {
    if (!useXplaneData) {
      const interval = setInterval(() => {
        UpdateOfflineData(offlineData, setOfflineData); // change data with Offline
        console.log(offlineData)
      }, 20); // update 20 times/s

      return () => clearInterval(interval); // Unmount function to prevent memory leaks.
    }
  })

  return <ArcGisMap zoom={10} useXplaneData={useXplaneData} myAirPlaneData={myAirPlaneData} offlineData={offlineData} />
}

export default Nav_map