import { React, useState } from 'react';
import PFD from './components/PFD';
import Future from './components/Future';
import LayoutButtons from './components/LayoutButtons';
import { Grid, Collapse } from '@mui/material';

import './App.css';
import Nav_map from './components/map/Navigation';

function App() {

  const [lightTheme, setLightTheme] = useState(0);
  const [collapse, setCollapse] = useState(true);
  const [useXplaneData, setUseXplaneData] = useState(true);
  const [planeData, setPlaneData] = useState();

  const changeLightTheme = (theme) => {
    setLightTheme(theme);
  }

  const changeViewMode = (mode) => {
    setCollapse(!collapse);
  }

  return (
    <div style={{ padding: '10px' }}>
      <Grid container style={{ padding: '50px', height: "100vh" }}>
        <Grid container>
          <Grid container style={{ position: "relative", zIndex: '0' }}>
            <Grid item xs={12}>
              <Nav_map useXplaneData={useXplaneData} parentCallback={setPlaneData} />
            </Grid>
          </Grid>
          <Grid container style={{ padding: '15px', height: "100%", position: "absolute", zIndex: '1' }}>
            <Grid item xs={3}>
              <Grid container direction="column" justifyContent="space-between" style={{ height: "100%" }}>
                <Grid item xs={3} style={{ height: "30%" }}>
                  <Collapse in={collapse}>
                    <PFD lightTheme={lightTheme} useXplaneData={useXplaneData} data={planeData} />
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