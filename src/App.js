import { React, useState } from 'react';
import PFD from './components/PFD';
import Map from './components/Map';
import Future from './components/Future';
import LayoutButtons from './components/LayoutButtons';
import { Grid } from '@mui/material';

import './App.css';

function App() {

  const [lightTheme, setLightTheme] = useState(0);

  const changeLightTheme = (mode) => {
    setLightTheme(mode);
    console.log("App mode: ", mode)
  }

  return (
    <Grid container style={{ backgroundColor: `${lightTheme ? "black" : "white"}` }}>
      <Grid container>
        <Grid item xl={4}>
          <PFD lightTheme={lightTheme} />
        </Grid>
        <Grid item xl={4}>
          <Map />
        </Grid>
        <Grid item xl={4}>
          <Future />
        </Grid>
      </Grid>
      <Grid container>
        <LayoutButtons parentCallback={changeLightTheme} />
      </Grid>
    </Grid>
  );
}

export default App;