import { React, useState, useEffect } from 'react';
import PFD from './PFD';
import Future from './Future';
import {BoxButtons, WidgetButtons} from './Buttons';
import { Grid, Collapse, Box, Stack } from '@mui/material';

import './WAD.css';
import zIndex from '@mui/material/styles/zIndex';
import Nav_map from './map/Navigation';

function WAD() {

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

    return (
        <Grid container className="wad_frame">
            <Grid container className="wad_content">
                {/* <Grid container className="map_container"> */}
                    <Grid item className="map_item" xs={12}>
                        <Nav_map />
                    </Grid>
                {/* </Grid> */}
                <Grid container className="overlay_container">
                    <Grid item xs={3}>
                        <Grid container direction="column" className="left_container">
                            <Grid item className="widgetbox" id="wb_one">
                                <Collapse in={collapse}>
                                    <PFD lightTheme={lightTheme} />
                                </Collapse>
                            </Grid>
                            <Grid item className="widgetbox" id="wb_two">
                                <p>Bottom Left </p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        Middle area
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container direction="column" className="right_container">
                            <Grid item className="widgetbox" id="wb_three">
                                <Future />
                            </Grid>
                            <Grid item className="widgetbox" id="wb_four">
                                <p>Bottom Right </p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item position="absolute" bottom={'0'} left={'0'} style={{ zIndex: '3' }}>
                    <BoxButtons lightTheme={changeLightTheme} viewMode={changeViewMode} />
                </Grid>
                <Grid item position="absolute" bottom={'0'} right={'0'} style={{ zIndex: '3' }}>
                    <WidgetButtons lightTheme={changeLightTheme} viewMode={changeViewMode} />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default WAD;