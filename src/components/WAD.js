import { React, useState, useEffect } from 'react';
import PFD from "./widgets/pfd/PFD"
import { BoxButtons, BoxButtonSide, WidgetButtons, ExtendableButtons } from './Buttons';
import { Grid, Collapse, Box, Stack } from '@mui/material';
import UpdateOfflineData from './map/UpdateOfflineData';
import { useXplaneData } from './constants';
import axios from 'axios';

import './WAD.css';
import zIndex from '@mui/material/styles/zIndex';
import Nav_map from './map/Navigation';
import WidgetSelector from './WidgetSelector';


/**
 * Component for selecting widget, its position and size.
 * @component 
 * @param {string} Usize size of upper widget (S/M/L)
 * @param {string} Bsize size of bottom widget (S/M/L)
 * @param {string} container left or right side container
 * @param {string} widgetName name of the widget
 * @returns one widget that covers the entire side or two widgets (top and bottom)
 */
function GridType({ Usize, Bsize, container, widgetName }) {

  if (Usize === 'L' && Bsize === 'L') {
    return (
      <Grid container direction="column" className="left_container" id="wb_three">
        <WidgetSelector widget={widgetName} size={'L'} useXplaneData={useXplaneData} />
      </Grid>)
  }

  else {
    return (
      <Grid container direction="column" className={container}>
        <Grid item className={Usize} id="wb_one">
          <WidgetSelector widget={widgetName} size={Usize} />
        </Grid>
        <Grid item className={Bsize} id="wb_two">
          <WidgetSelector widget={widgetName} size={Bsize} />
        </Grid>
      </Grid>)
  }
}
/**
   * Component for creating the WAD.
   * @component
   */
function WAD() {
  // States to keep track of layout.
  const [UL, setUL] = useState('');
  const [BL, setBL] = useState('');
  const [UR, setUR] = useState('');
  const [BR, setBR] = useState('');
  const [activeWidget, setActiveWidget] = useState("");
  const [showWidgets, setShowWidgets] = useState([]);
  
  // States to manage data with/without X-Plane
  const [myAirPlaneData, setMyAirPlaneData] = useState();
  const [aiPlaneData, setAiPlaneData] = useState();
  const [offlineData, setOfflineData] = useState();

  const updateWidget = (widget) => setActiveWidget(widget);

  const handleUpdate = (index, widget) => {
    const newWidgets = [...showWidgets];
    newWidgets[index] = widget;
    setShowWidgets(newWidgets);
  }


  const changeViewMode = (box) => {

    let index = box - 1;
    switch (activeWidget) {
      case "PFD": return handleUpdate(index, <PFD data={useXplaneData ? myAirPlaneData : offlineData} />);
      case "None": return handleUpdate(index, null);
    }
  }


  const getDataPlane = () => {
      axios.get('/plane')
      .then(res => setMyAirPlaneData(res.data))
      .catch((error) => console.log(error.message))
  }

  const getDataEnv = () => {
    axios.get('/env')
    .then(res => setAiPlaneData(res.data))
    .catch((error) => console.log(error.message))
}

  // Use myAirPlaneData from xplane
  useEffect(() => {
    const interval = setInterval(() => {
      getDataEnv()
      getDataPlane()
    }, 500);
    return () => clearInterval(interval);

  },[])

  // Use offline data
  useEffect(() => {
    const interval = setInterval(() => {
      UpdateOfflineData(offlineData, setOfflineData); // change data with Offline
    }, 20); // update 20 times/s

    return () => clearInterval(interval); // Unmount function to prevent memory leaks.
  })

  return (
    <Grid container className="wad_frame">
      <Grid container className="wad_content">
        <Grid item className="map_item" xs={12}>
          <Nav_map useXplaneData={useXplaneData} myAirPlaneData={myAirPlaneData} aiPlaneData={aiPlaneData} offlineData={offlineData} />
        </Grid>
        <Grid container className="overlay_container">
          <Grid item xs={3}>
            <GridType Usize={UL} Bsize={BL} container={'left_container'} widgetName={activeWidget} />
          </Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={3}>
            <GridType Usize={UR} Bsize={BR} container={'right_container'} widgetName={activeWidget} />
          </Grid>
        </Grid>
        <Grid item position="absolute" top={'0'} right={'0'} style={{ zIndex: '3' }}>
          <ExtendableButtons />
        </Grid>
        <Grid item position="absolute" bottom={'0'} left={'35vw'} right={'35vw'} style={{ zIndex: '3' }}>
          <WidgetButtons activeWidget={updateWidget} />
        </Grid>
        <Grid item position="absolute" left={'1vh'} style={{ zIndex: '3' }}>
          <BoxButtons Usize={setUL} Bsize={setBL} />
        </Grid>
        <Grid item position="absolute" right={'1vh'} style={{ zIndex: '3' }}>
          <BoxButtons Usize={setUR} Bsize={setBR} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default WAD;