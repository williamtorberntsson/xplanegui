import { React, useState, useEffect } from 'react';
import PFD from './PFD';
import Future from './Future';
import { BoxButtons, BoxButtonSide, WidgetButtons, ExtendableButtons } from './Buttons';
import { Grid, Collapse, Box, Stack } from '@mui/material';
import UpdateOfflineData from './map/UpdateOfflineData';

import './WAD.css';
import zIndex from '@mui/material/styles/zIndex';
import Nav_map from './map/Navigation';

function GridType({U, B, container}) {

  if (U === 'L' && B === 'L'){
    return(
     <Grid container direction="column" className="left_container" id="wb_three">
      </Grid>)
  }

  else{
    return(
      <Grid container direction="column" className={container}>
         <Grid item className={U} id="wb_one">
        </Grid>
        <Grid item className={B} id="wb_two">
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


  const changeViewMode = (box) => {

    let index = box - 1;
    switch (activeWidget) {
      case "PFD": return handleUpdate(index, <PFD data={useXplaneData ? myAirPlaneData : offlineData} />);
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
            <GridType U={UL} B={BL} container={'left_container'} />
          </Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={3}>
          <GridType  U={UR} B={BR} container={'right_container'} />
          </Grid>
        </Grid>
        <Grid item position="absolute" top={'0'} right={'0'} style={{ zIndex: '3' }}>
          <ExtendableButtons />
        </Grid>
        <Grid item position="absolute" bottom={'0'} left={'35vw'} right={'35vw'} style={{ zIndex: '3'}}>
          <WidgetButtons activeWidget={updateWidget} />
        </Grid>
        <Grid item position="absolute" left={'1vh'} style={{ zIndex: '3' }}>
          <BoxButtons U={setUL} B={setBL}/>
        </Grid>
        <Grid item position="absolute" right={'1vh'} style={{ zIndex: '3' }}>
          <BoxButtons U={setUR} B={setBR}/>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default WAD;