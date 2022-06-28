import { React, useState } from 'react';
import PFD from './components/PFD';
import WAD from './components/WAD';
import Esri from './components/WAD_esri';
import Future from './components/Future';
import LayoutButtons from './components/LayoutButtons';
import { Grid, Collapse, Box, Stack } from '@mui/material';

import './App.css';
import zIndex from '@mui/material/styles/zIndex';

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
    <Esri/>
    // <Grid container style={{padding: '50px', height: "100vh", backgroundColor: "grey" }}>
    //   <Grid container>
    //     <Grid container style={{position: "relative", zIndex: '0' }}>
    //       <Esri/>
    //     </Grid>
    //     <Grid container style={{padding: '15px', height: "100%", position: "absolute", zIndex: '1'}}>
    //       <Grid item xs={3}>
    //         <Grid container direction="column" justifyContent="space-between" style={{ height: "100%" }}>
    //           <Grid item xs={3} style={{ height: "30%" }}>
    //             <Collapse in={collapse}>
    //               <PFD lightTheme={lightTheme} />
    //             </Collapse>
    //           </Grid>
    //           <Grid item xs={3} style={{ height: "30%", textAlign: "center" }}>
    //             <p>Bottom Left </p>
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //       <Grid item xs={6} style={{ textAlign: "center" }}>
    //         Middle area
    //       </Grid>
    //       <Grid item xs={3}>
    //         <Grid container direction="column" justifyContent="space-between" style={{ height: "100%" }}>
    //           <Grid item xs={3} style={{ height: "30%" }}>
    //             <Future />
    //           </Grid>
    //           <Grid item xs={3} style={{ height: "30%", textAlign: "center" }}>
    //             <p>Bottom Right </p>
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //     <Grid item position="absolute" bottom={0} left={0} style={{zIndex: '3'}}>
    //     <LayoutButtons lightTheme={changeLightTheme} viewMode={changeViewMode} />
    //   </Grid>
    //   </Grid>
    // </Grid>
  );
}

export default App;