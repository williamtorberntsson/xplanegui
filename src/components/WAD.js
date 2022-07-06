import { React, useState, useEffect } from 'react';
import PFD from './PFD';
import Future from './Future';
import { BoxButtons, WidgetButtons, ExtendableButtons } from './Buttons';
import { Grid, Collapse, Box, Stack } from '@mui/material';
import UpdateOfflineData from './map/UpdateOfflineData';

import './WAD.css';
import zIndex from '@mui/material/styles/zIndex';
import Nav_map from './map/Navigation';

function WAD() {

  // const [lightTheme, setLightTheme] = useState(0);
  const [activeBox, setActiveBox] = useState(0);
  const [activeWidget, setActiveWidget] = useState("");
  const [showWidgets, setShowWidgets] = useState([]);
  const [collapse, setCollapse] = useState(true);
  const [mapCenter, setMapCenter] = useState([15.580926012604708, 58.41157469382408]);
  const [orientation, setOrientation] = useState(0);
  const [useXplaneData, setUseXplaneData] = useState(false);
  const [myAirPlaneData, setMyAirPlaneData] = useState();
  const [aiPlaneData, setAiPlaneData] = useState();
  const [offlineData, setOfflineData] = useState();

  // const changeLightTheme = (theme) => {
  //     setLightTheme(theme);
  //     console.log("App mode: ", theme)
  // }

  const updateWidget = (widget) => {
    setActiveWidget(widget)
  }

  const handleUpdate = (index, widget) => {
    const newWidgets = [...showWidgets];
    newWidgets[index] = widget;
    setShowWidgets(newWidgets);
  }

  // console.log("Active widgets: ", showWidgets)
  // console.log("Active Box: ", activeBox, "Active Widget: ", activeWidget)

  const changeViewMode = (box) => {

    let index = box - 1;
    switch (activeWidget) {
      case "PFD": return handleUpdate(index, <PFD useXplaneData={useXplaneData} data={myAirPlaneData} />);
      case "None": return handleUpdate(index, null);

    }
  }

  // Use myAirPlaneData from xplane
  useEffect(() => {
    if (useXplaneData) {
      // console.timeEnd("between")
      // console.time("fetch")

      fetch("/plane").then(
        res => res.json()
      ).then(
        data => {
          setMyAirPlaneData(data)
        }
      )

      // Xplane traffic
      fetch("/env").then(
        res => res.json()
      ).then(
        data => {
          setAiPlaneData(data)
        }
      )
      // console.timeEnd("fetch")
      // console.time("between")
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

  return (
    <Grid container className="wad_frame">
      <Grid container className="wad_content">
        {/* <Grid container className="map_container"> */}
        <Grid item className="map_item" xs={12}>
          <Nav_map useXplaneData={useXplaneData} myAirPlaneData={myAirPlaneData} aiPlaneData={aiPlaneData} offlineData={offlineData} />
        </Grid>
        {/* </Grid> */}
        <Grid container className="overlay_container">
          <Grid item xs={3}>
            <Grid container direction="column" className="left_container">
              <Grid item className="widgetbox" id="wb_one">
                {/* <Collapse in={collapse}>
                                    <PFD/>
                                </Collapse> */}
                {showWidgets[0]}
              </Grid>
              <Grid item className="widgetbox" id="wb_two">
                {showWidgets[1]}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>

          </Grid>
          <Grid item xs={3}>
            <Grid container direction="column" className="right_container">
              <Grid item className="widgetbox" id="wb_three">
                <Future />
                {showWidgets[2]}
              </Grid>
              <Grid item className="widgetbox" id="wb_four">
                {showWidgets[3]}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item position="absolute" top={'0'} right={'0'} style={{ zIndex: '3' }}>
          <ExtendableButtons />
        </Grid>
        <Grid item position="absolute" bottom={'0'} left={'0'} style={{ zIndex: '3' }}>
          <BoxButtons activeBox={changeViewMode} />
        </Grid>
        <Grid item position="absolute" bottom={'0'} right={'0'} style={{ zIndex: '3' }}>
          <WidgetButtons activeWidget={updateWidget} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default WAD;