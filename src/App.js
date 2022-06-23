import { React, useState } from 'react';
import PFD from './components/PFD';
import Map from './components/Map';
import Future from './components/Future';
import LayoutButtons from './components/LayoutButtons';
import { Grid, Collapse, Box } from '@mui/material';

import './App.css';

function App() {

  const [lightTheme, setLightTheme] = useState(0);
  const [collapse, setCollapse] = useState(true);

  const changeLightTheme = (theme) => {
    setLightTheme(theme);
    console.log("App mode: ", theme)
  }

  const changeViewMode = (mode) => {
    setCollapse(!collapse);
  }

  return (
    <Grid container style={{ padding: "50px", height: "100vh", backgroundColor: "grey" }}>
      <Grid container style={{ position: "relative", backgroundColor: "darkgreen" }}>
        <div>
          <Map />
        </div>
        <Grid container style={{ display: "absolute", height: "100%", position: "absolute" }}>
          <Grid item xs={3}>
            <Grid container direction="column" justifyContent="space-between" style={{ height: "100%" }}>
              <Grid item xs={3} style={{ height: "30%" }}>
                <Collapse in={collapse}>
                  PFD
                  <PFD lightTheme={lightTheme} />
                </Collapse>
              </Grid>
              <Grid item xs={3} style={{ height: "30%" }}>
                <p>Bottom Left </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} style={{textAlign: "center"}}>
            Middle area
          </Grid>
          <Grid item xs={3}>
            <Grid container direction="column" justifyContent="space-between" style={{ height: "100%" }}>
              <Grid item xs={3} style={{ height: "30%" }}>
                <Future />
              </Grid>
              <Grid item xs={3} style={{ height: "30%" }}>
                <p>Bottom Right </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item position="absolute" bottom={0} left={0}>
        <LayoutButtons lightTheme={changeLightTheme} viewMode={changeViewMode} />
      </Grid>
    </Grid>
  );
}

export default App;