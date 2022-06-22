import { React, useState } from 'react';
import PFD from './components/PFD';
import Map from './components/Map';
import Future from './components/Future';
import LayoutButtons from './components/LayoutButtons';
import { Grid, Collapse } from '@mui/material';

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
    <Grid container style={{ height: "100vh", backgroundColor: `${lightTheme ? "black" : "white"}` }}>
      <Grid container>
        <Grid item xl={4} sx={{ display: collapse ? 'block' : 'none' }}>
          <Collapse in={collapse}>
            <PFD lightTheme={lightTheme} />
          </Collapse>
        </Grid>
        <Grid item xl={collapse ? 4 : 8}>
          <Map />
        </Grid>
        <Grid item xl={4}>
          <Future />
        </Grid>
      </Grid>
      <Grid container>
        <LayoutButtons lightTheme={changeLightTheme} viewMode={changeViewMode} />
      </Grid>
    </Grid>
  );
}

export default App;