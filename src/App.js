import { React, useState } from 'react';
import PFD from './components/PFD';
import WAD from './components/WAD';
import Future from './components/Future';
import LayoutButtons from './components/LayoutButtons';
import { Grid } from '@mui/material';

import './App.css';

function App() {

  const [visualMode, setVisualMode] = useState(0);

  const changeVisualMode = (mode) => {
    setVisualMode(mode);
    console.log("Mode: :", mode)
  }

  return (
    <Grid container style={{ backgroundColor: `${visualMode}`, height: '100vh' }}>
      <Grid container>
        <Grid item xl={4} xs={4} md={4} lg={4}>
          <PFD />
        </Grid>
        <Grid item xl={4} xs={4} md={4} lg={4}>
          <WAD />
        </Grid>
        <Grid item xl={4} xs={4} md={4} lg={4}>
          <Future />
        </Grid>
      </Grid>
      <Grid container>
        <LayoutButtons parentCallback={changeVisualMode} />
      </Grid>
    </Grid>
  );
}

export default App;