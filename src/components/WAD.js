import { React, useState, useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import arrowUp from '../assets/img/arrow-up.png'
import './WAD.css';

// components
import ArcGisMap from './map/ArcGisMap';
import UpdateOfflineData from './map/UpdateOfflineData';
import WarningOverlay from './WarningOverlay';
import WidgetsNButtons from './WidgetsNButtons';

// constants
import { USE_XPLANE_DATA, DATA_FREQUENCY, NR_AI_PLANES } from '../settings';


/**
  * Component for creating the WAD.
  * @component
  * @category WAD
  * @return WAD
  */
function WAD({ socket }) {

  // States to manage data with/without X-Plane
  const [myAirPlaneData, setMyAirPlaneData] = useState();
  const [aiPlaneData, setAiPlaneData] = useState();
  const [widgetData, setWidgetData] = useState({});
  const [offlineData, setOfflineData] = useState();

  const [showPullUp, setShowPullUp] = useState(false)

  // Socket
  const [time, setTime] = useState(Date.now())

  const handleSubmit = (path, message = "") => {
    socket.emit(path, message)
  };

  /**
   * Whenever socket updates corresponding event is triggered
   */
  useEffect(() => {

    socket.on("plane", (data) => {
      setMyAirPlaneData(data)
    });

    socket.on("pfd", (data) => {
      setWidgetData((state) => ({ ...state, "pfd": data }))
    });

    socket.on("weights", (data) => {
      setWidgetData((state) => ({ ...state, "weights": data }))
    });

    socket.on("warnings", (data) => {
      setWidgetData((state) => ({ ...state, "warnings": data }))
    });

    socket.on("status", (data) => {
      console.log("recieved status")
      setWidgetData((state) => ({ ...state, "status": data }))
    });

    socket.on("aiplanes", (data) => {
      setAiPlaneData(data)
    });

  }, [socket]);


  // PULL UP Warning when pitch < -60 and altitude < 5000m 
  useEffect(() => {
    if (myAirPlaneData) {
      if (myAirPlaneData.pitch < - 60 && myAirPlaneData.altitude < 5000) {
        setShowPullUp(true)
      } else {
        setShowPullUp(false)
      }
    }
  }, [myAirPlaneData])


  // Counter for updating data with
  // frequency of DATA_FREQUENCY.
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now())
    }, 1000 / DATA_FREQUENCY);
    return () => clearInterval(interval);
  }, [])


  // Use myAirPlaneData from xplane
  useEffect(() => {
    if (USE_XPLANE_DATA) {
      handleSubmit("plane")
      handleSubmit("pfd")
      handleSubmit("weights")
      handleSubmit("warnings")
      handleSubmit("aiplanes", NR_AI_PLANES)
    }
  }, [time])

  // Use offline data
  useEffect(() => {
    if (!USE_XPLANE_DATA) {
      UpdateOfflineData(offlineData, setOfflineData); // change data with Offline
      //setWidgetData(offlineData)
    }
  }, [time])

  return (
    <Grid container className="wad_frame">
      <Grid container className="wad_content">
        <Grid item className="map_item" xs={12}>
          <ArcGisMap zoom={8} myAirPlaneData={myAirPlaneData} aiPlaneData={aiPlaneData} offlineData={offlineData} />
        </Grid>

        <WarningOverlay show={showPullUp} />

        <WidgetsNButtons data={widgetData} dataRequest={handleSubmit} />

      </Grid>
    </Grid>
  );
}

export default WAD;