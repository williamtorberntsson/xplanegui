import { React, useState, useEffect } from 'react';
import PFD from './PFD';
import Future from './Future';
import { BoxButtons, WidgetButtons, ExtendableButtons } from './Buttons';
import { Grid, Collapse, Box, Stack } from '@mui/material';

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
  const [planeData, setPlaneData] = useState();

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
      case "PFD": return handleUpdate(index, <PFD useXplaneData={useXplaneData} data={planeData} />);
      case "None": return handleUpdate(index, null);

    }
  }

  return (
    <Grid container className="wad_frame">
      <Grid container className="wad_content">
        {/* <Grid container className="map_container"> */}
        <Grid item className="map_item" xs={12}>
          <Nav_map useXplaneData={useXplaneData} parentCallback={setPlaneData} />
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