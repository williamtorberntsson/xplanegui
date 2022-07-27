import { React, useState, useEffect, useRef } from 'react';
import BoxButtons from './buttons/testButtons';
import ResetButton from './buttons/ResetButtons';
import ExtendableButtons from './buttons/ExtendableButtons';
import WidgetButtons from './buttons/WidgetButtons';
import { Grid } from '@mui/material';
import UpdateOfflineData from './map/UpdateOfflineData';
import buttonNavigator from '../buttonNavigator';

import './WAD.css';
import WidgetSelector from './WidgetSelector';
import ArcGisMap from './map/ArcGisMap';
import { fetchData, fetchWidgetData } from './fetchData';
import { USE_XPLANE_DATA, KEY_NAVIGATION_CONFIG as KEY, WIDGET_ORDER } from '../constants';


/**
 * Component for selecting widget, its position and size.
 * @component
 * @category WAD
 * @prop {string} Usize size of upper widget (S/M/L)
 * @prop {string} Bsize size of bottom widget (S/M/L)
 * @prop {string} container left or right side container
 * @prop {dict}
 * @prop {string} widgetName name of the widget
 * @returns one widget that covers the entire side or two widgets (top and bottom)
 */
function GridType({ Usize, Bsize, side, container, data, widgetPositions }) {

  if (Usize === 'L' && Bsize === 'L') {

    // console.log('upper size: ' + Usize + ' ,bottom size: ' + Bsize)
    return (
      <Grid container direction="column" className={container}>
        <Grid item className={Usize} id="wb_three">
          <WidgetSelector widget={widgetPositions[`M${side}`]} size={Usize} data={data} />
        </Grid>
      </Grid>)
  }

  else {
    if (Usize == 'L') {
      Usize = ''
    }
    else if (Bsize == 'L') {
      Bsize = ''
    }
    // console.log('upper size: ' + Usize + ' ,bottom size: ' + Bsize)
    return (
      <Grid container direction="column" className={container}>
        <Grid item className={Usize} id="wb_one">
          <WidgetSelector widget={widgetPositions[`U${side}`]} size={Usize} data={data} />
        </Grid>
        <Grid item className={Bsize} id="wb_two">
          <WidgetSelector widget={widgetPositions[`B${side}`]} size={Bsize} data={data} />
        </Grid>
      </Grid>)
  }

}

/**
  * Component for creating the WAD.
  * @component
  * @category WAD
  * @return WAD
  */
function WAD() {
  // States to keep track of widget sizes
  const [UL, setUL] = useState('');
  const [BL, setBL] = useState('');
  const [UR, setUR] = useState('');
  const [BR, setBR] = useState('');

  // States to keep track of layout.
  const [selectedWidget, setSelectedWidget] = useState("");
  const [selectedWidgetPos, setSelectedWidgetPos] = useState("")
  const [widgetPositions, setWidgetPositions] = useState({ UL: null, ML: null, BL: null, UR: null, MR: null, BR: null });

  // States to manage data with/without X-Plane
  const [myAirPlaneData, setMyAirPlaneData] = useState();
  const [aiPlaneData, setAiPlaneData] = useState();
  const [widgetData, setWidgetData] = useState({});
  const [offlineData, setOfflineData] = useState();

  // States for navigating buttons with throttle
  /**
   * State for recently pressed button
   */
  const [activeBtn, setActiveBtn] = useState('1');
  /**
   * State for navigation mode.
   * 0 is side buttons
   * 1 is widget buttons
   * @category keynavigation
   */
  const [selecterMode, _setSelecterMode] = useState(0);
  /**
   * State for which key is selected when navigating with throttle
   * @category keynavigation
   */
  const [selecter, _setSelecter] = useState('1');

  /**
   * Ref for selecter state
   * @category keynavigation
   */
  const selecterRef = useRef(selecter)
  /**
   * Update selecter state function
   * @function
   * @category keynavigation
   * @param {number} state key
   */
  const setSelecter = state => {
    selecterRef.current = state;
    _setSelecter(state);
  }

  /**
   * Ref for selecterMode state
   * @category keynavigation
   */
  const selecterModeRef = useRef(selecterMode)
  /**
   * Update selecterMode state function
   * @function
   * @category keynavigation
   * @param {number} state mode
   */
  const setSelecterMode = state => {
    if (state == 0) setSelecter('1')
    else if (state == 1) setSelecter(WIDGET_ORDER[1])
    selecterModeRef.current = state;
    _setSelecterMode(state);
  }

  /**
   * Handle key is pressed events.
   * Manages mode and select buttons
   * @function
   * @category keynavigation
   * @param {event} event 
   */
  function handleKeyDown(e) {
    console.log("key pressed: ", e.keyCode);
    console.log(selecterRef.current.toString())
    console.log(activeBtn)

    if (e.keyCode == KEY.P) setActiveBtn(selecterRef.current.toString());
    else if (e.keyCode == KEY.M) setSelecterMode((selecterModeRef.current + 1) % 2)
    else buttonNavigator(e.keyCode, selecterModeRef.current, selecterRef.current, setSelecter, setSelecterMode);
  }

  /**
   * useEffect to handle key presses
   * Using this way to detect key presses refs are required for updating states
   * @category keynavigation
   */
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return function clean() {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, []);



  /**
   * Function to clean widgets on each side
   * @function
   * @param {string} side side to reset
   */
  function cleanUp(side) {
    console.log('clean')

    if (side == 'left') {
      setWidgetPositions({ ...widgetPositions, UL: null, ML: null, BL: null })
      setWidgetData('')
    }
    else if (side == 'right') {
      setWidgetPositions({ ...widgetPositions, UR: null, MR: null, BR: null })
      setWidgetData('')
    }
  }


  /**
   * Function to update widget's position
   * @function
   * @param {string} widget name of widget
   */
  const updateWidgetPos = (widget) => {
    setSelectedWidget(widget) // update selected widget
    setWidgetPositions({ ...widgetPositions, [selectedWidgetPos]: widget }) // use param (widget) instead of state as it may not be updated
  }

  // Use myAirPlaneData from xplane
  useEffect(() => {
    if (USE_XPLANE_DATA) {
      const interval = setInterval(() => {
        fetchData("env", setAiPlaneData)
        fetchData("plane", setMyAirPlaneData)
        fetchWidgetData("pfd", setWidgetData, widgetData)
        fetchWidgetData("weights", setWidgetData, widgetData)
      }, 500);
      return () => clearInterval(interval);
    }

  }, [])

  // Use offline data
  useEffect(() => {
    if(!USE_XPLANE_DATA){
    const interval = setInterval(() => {
      UpdateOfflineData(offlineData, setOfflineData); // change data with Offline
      setWidgetData(offlineData)
    }, 200); // update 20 times/s

    // console.log(widgetData)
  
    return () => clearInterval(interval); // Unmount function to prevent memory leaks.
  }
  })

  return (
    <Grid container className="wad_frame">
      <Grid container className="wad_content">
        <Grid item className="map_item" xs={12}>
          <ArcGisMap zoom={8} myAirPlaneData={myAirPlaneData} aiPlaneData={aiPlaneData} offlineData={offlineData} />
        </Grid>



        <Grid container className="overlay_container">
          <Grid item xs={3}>
            <GridType Usize={UL} Bsize={BL} container={'left_container'} data={widgetData} side={"L"} widgetPositions={widgetPositions} />
          </Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={3}>
            <GridType Usize={UR} Bsize={BR} container={'right_container'} data={widgetData} side={"R"} widgetPositions={widgetPositions} />
          </Grid>
        </Grid>



        <Grid item position="absolute" top={'0'} right={'0'} style={{ zIndex: '3' }}>
          <ExtendableButtons />
        </Grid>
        <Grid item position="absolute" bottom={'0'} style={{ zIndex: '3', width: "94%" }}>
          {/* <button className="button-30" role="button" onClick={() => { cleanUp('left') }}>Reset Left side</button> */}
          <WidgetButtons update={updateWidgetPos} activeBtn={activeBtn} selecter={selecter} reset={cleanUp} />
          {/* <button className="button-30" role="button" onClick={() => { cleanUp('right') }}>Reset Right side</button> */}
        </Grid>
        <Grid item position="absolute" left={'1vh'} style={{ zIndex: '3' }}>
          <BoxButtons Usize={setUL} Bsize={setBL} selectedPos={setSelectedWidgetPos} side={"L"} arrow={'>'} activeBtn={activeBtn} btnUpdate={setActiveBtn} selecter={selecter} />
        </Grid>
        <Grid item position="absolute" right={'1vh'} style={{ zIndex: '3' }}>
          <BoxButtons Usize={setUR} Bsize={setBR} selectedPos={setSelectedWidgetPos} side={"R"} arrow={'<'} activeBtn={activeBtn} btnUpdate={setActiveBtn} selecter={selecter} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default WAD;