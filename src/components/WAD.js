import { React, useState, useEffect } from 'react';
import PFD from './PFD';
import Future from './Future';
import {BoxButtons, WidgetButtons, ExtendableButtons} from './Buttons';
import { Grid, Collapse, Box, Stack } from '@mui/material';

import './WAD.css';
import zIndex from '@mui/material/styles/zIndex';
import Nav_map from './map/Navigation';

function WAD() {

    // const [lightTheme, setLightTheme] = useState(0);
    const [activeBox, setActiveBox] = useState(0);
    const [activeWidget, setActiveWidget] = useState("");
    const [tempWidget1, setTempWidget1] = useState();
    const [tempWidget2, setTempWidget2] = useState();
    const [tempWidget3, setTempWidget3] = useState();
    const [tempWidget4, setTempWidget4] = useState();
    const [collapse, setCollapse] = useState(true);
    const [mapCenter, setMapCenter] = useState([15.580926012604708, 58.41157469382408]);
    const [orientation, setOrientation] = useState(0);
    const [useXplaneData, setUseXplaneData] = useState(false);
    const [planeData, setPlaneData] = useState();

    // const changeLightTheme = (theme) => {
    //     setLightTheme(theme);
    //     console.log("App mode: ", theme)
    // }

    const updateWidget = (widget) => {
        setActiveWidget(widget)
    }

    const updateBox = (box) => {
        setActiveBox(box);
    }
    
    // console.log("Active Box: ", activeBox, "Active Widget: ", activeWidget)

    const changeViewMode = (box) => {
        // setActiveBox(box)
            // updateBox(box);
            // console.log("Active Widget: ", activeWidget, "Active box", activeBox)
            // // console.log("Active Box: ", box)
            switch(box){
                case 1:
                    // if (activeWidget != tempWidget1) {    
                        switch(activeWidget){
                            case "PFD":   return setTempWidget1(<PFD useXplaneData={useXplaneData} data={planeData}/>);
                            case "None":   return setTempWidget1();
                        // }
                    }
                case 2: 
                    // if (activeWidget != tempWidget1) {  
                        switch(activeWidget){
                            case "PFD":   return setTempWidget2(<PFD useXplaneData={useXplaneData} data={planeData}/>);
                            case "None":  return setTempWidget2();
                        // }
                    }
                case 3: 
                    // if (activeWidget != tempWidget1) {  
                        switch(activeWidget){
                            case "PFD":   return setTempWidget3(<PFD useXplaneData={useXplaneData} data={planeData}/>);
                            case "None": return setTempWidget3();
                        }
                    // }
                case 4: 
                    // if (activeWidget != tempWidget1) {  
                        switch(activeWidget){
                            case "PFD":   return setTempWidget4(<PFD useXplaneData={useXplaneData} data={planeData}/>);
                            case "None": return setTempWidget4();
                        }
                    // }

                
                    console.log("Active Widget: ", activeWidget, "Active box", box)
            }
            // console.log("Active Widget: ", activeWidget, "Active box", box)
    }
            // setActiveBox(0)
            // setActiveWidget(0)

    return (
        <Grid container className="wad_frame">
            <Grid container className="wad_content">
                {/* <Grid container className="map_container"> */}
                    <Grid item className="map_item" xs={12}>
                        <Nav_map useXplaneData={useXplaneData} parentCallback={setPlaneData}/>
                    </Grid>
                {/* </Grid> */}
                <Grid container className="overlay_container">
                    <Grid item xs={3}>
                        <Grid container direction="column" className="left_container">
                            <Grid item className="widgetbox" id="wb_one">
                                {/* <Collapse in={collapse}>
                                    <PFD/>
                                </Collapse> */}
                                {tempWidget1}
                            </Grid>
                            <Grid item className="widgetbox" id="wb_two">
                                {tempWidget2}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                   
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container direction="column" className="right_container">
                            <Grid item className="widgetbox" id="wb_three">
                                <Future />
                                {tempWidget3}
                            </Grid>
                            <Grid item className="widgetbox" id="wb_four">
                                {tempWidget4}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item position="absolute" top={'0'} right={'0'} style={{ zIndex: '3' }}>
                    <ExtendableButtons/>
                </Grid>
                <Grid item position="absolute" bottom={'0'} left={'0'} style={{ zIndex: '3' }}>
                    <BoxButtons activeBox={changeViewMode}/>
                </Grid>
                <Grid item position="absolute" bottom={'0'} right={'0'} style={{ zIndex: '3' }}>
                    <WidgetButtons activeWidget={updateWidget}/>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default WAD;