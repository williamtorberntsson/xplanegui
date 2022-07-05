import { React, useState, useEffect } from 'react';
import ArcGisMap from './ArcGisMap';
import UpdateOfflineData from './UpdateOfflineData';

function Nav_map({ useXplaneData, parentCallback }) {
  const [myAirPlaneData, setMyAirPlaneData] = useState();
  const [aiPlaneData, setAiPlaneData] = useState();
  const [offlineData, setOfflineData] = useState(null);
  const nrAiPlanes = 5;

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

      // Xplane traffic
      fetch("/env").then(
        res => res.json()
      ).then(
        aiPlaneData => {
          setAiPlaneData(aiPlaneData)
        }
      )
    }
  })

  // Use offline data
  useEffect(() => {
    if (!useXplaneData) {
      const interval = setInterval(() => {
        UpdateOfflineData(offlineData, setOfflineData); // change data with Offline
      }, 20); // update 20 times/s

      return () => clearInterval(interval); // Unmount function to prevent memory leaks.
    }
  })

  return <ArcGisMap zoom={3} useXplaneData={useXplaneData} myAirPlaneData={myAirPlaneData} aiPlaneData = {aiPlaneData} nrAiPlanes={nrAiPlanes} offlineData={offlineData} />
}

export default Nav_map