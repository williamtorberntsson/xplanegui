import { React, useState, useEffect } from 'react';
import PFD from './components/PFD';
import Future from './components/Future';
import LayoutButtons from './components/LayoutButtons';
import { Grid, Collapse, Box, Stack } from '@mui/material';

import './App.css';
import zIndex from '@mui/material/styles/zIndex';
import Nav_map from './components/map/Navigation';

function App() {

  const [lightTheme, setLightTheme] = useState(0);
  const [collapse, setCollapse] = useState(true);
  const [mapCenter, setMapCenter] = useState([15.580926012604708, 58.41157469382408]);
  const [orientation, setOrientation] = useState(0);

  const changeLightTheme = (theme) => {
    setLightTheme(theme);
    console.log("App mode: ", theme)
  }

  const changeViewMode = (mode) => {
    setCollapse(!collapse);
  }

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

    <div>

      <Grid container style={{ padding: '50px', height: "100vh" }}>
        <Grid container>
          <Grid container style={{ position: "relative", zIndex: '0' }}>
            <Grid item xs={12}>
              <Nav_map />
            </Grid>
          </Grid>
          <Grid container style={{ padding: '15px', height: "100%", position: "absolute", zIndex: '1' }}>
            <Grid item xs={3}>
              <Grid container direction="column" justifyContent="space-between" style={{ height: "100%" }}>
                <Grid item xs={3} style={{ height: "30%" }}>
                  <Collapse in={collapse}>
                    <PFD lightTheme={lightTheme} />
                  </Collapse>
                </Grid>
                <Grid item xs={3} style={{ height: "30%", textAlign: "center" }}>
                  <p>Bottom Left </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "center" }}>
              Middle area
            </Grid>
            <Grid item xs={3}>
              <Grid container direction="column" justifyContent="space-between" style={{ height: "100%" }}>
                <Grid item xs={3} style={{ height: "30%" }}>
                  <Future />
                </Grid>
                <Grid item xs={3} style={{ height: "30%", textAlign: "center" }}>
                  <p>Bottom Right </p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item position="absolute" bottom={0} left={0} style={{ zIndex: '3' }}>
            <LayoutButtons lightTheme={changeLightTheme} viewMode={changeViewMode} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;