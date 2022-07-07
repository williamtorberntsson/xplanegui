import { React, useState, useEffect } from 'react';
import PFD from "./widgets/pfd/PFD"
import { BoxButtons, BoxButtonSide, WidgetButtons, ExtendableButtons } from './Buttons';
import { Grid, Collapse, Box, Stack } from '@mui/material';
import UpdateOfflineData from './map/UpdateOfflineData';
import { useXplaneData } from './constants';

import './WAD.css';
import zIndex from '@mui/material/styles/zIndex';
import Nav_map from './map/Navigation';
import WidgetSelector from './WidgetSelector';

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

function WAD() {
  // const [lightTheme, setLightTheme] = useState(0);
  const [UL, setUL] = useState('');
  const [BL, setBL] = useState('');
  const [UR, setUR] = useState('');
  const [BR, setBR] = useState('');
  const [activeWidget, setActiveWidget] = useState("");
  const [showWidgets, setShowWidgets] = useState([]);
  const [myAirPlaneData, setMyAirPlaneData] = useState();
  const [aiPlaneData, setAiPlaneData] = useState();
  const [offlineData, setOfflineData] = useState();

  const updateWidget = (widget) => setActiveWidget(widget);

  const handleUpdate = (index, widget) => {
    const newWidgets = [...showWidgets];
    newWidgets[index] = widget;
    setShowWidgets(newWidgets);
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