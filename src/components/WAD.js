import { React, useState, useEffect, useRef } from 'react';
import BoxButtons from './buttons/BoxButtons';
import ExtendableButtons from './buttons/ExtendableButtons';
import WidgetButtons from './buttons/WidgetButtons';
import { Grid } from '@mui/material';
import UpdateOfflineData from './map/UpdateOfflineData';
import buttonNavigator from '../buttonNavigator';
import arrowUp from '../assets/img/arrow-up.png'

import './WAD.css';
import WidgetSelector from './WidgetSelector';
import ArcGisMap from './map/ArcGisMap';
import { fetchData, fetchWidgetData } from './fetchData';
import { USE_XPLANE_DATA, WIDGET_ORDER } from '../settings';


/**
 * Component that sets the correct widget, its position and size.
 * @component
 * @category WAD
 * @prop {string} Usize size of upper widget (S/M/L)
 * @prop {string} Bsize size of bottom widget (S/M/L)
 * @prop {string} side L/R side of screen
 * @prop {string} container left or right side container
 * @prop {object} data data for all widgets
 * @prop {object} widgetPositions name for widget at every position
 * @returns one side with widgets
 */
function GridType({ Usize, Bsize, side, container, data, widgetPositions }) {
  if (Usize === 'WARN') {
    return (
      <Grid container direction="column" className={container}>
        <Grid item className={Usize} id="wb_three">

        </Grid>
      </Grid>
    )
  }

  else if (Usize === 'L' && Bsize === 'L') {
    return (
      <Grid container direction="column" className={container}>
        <Grid item className={Usize} id="wb_three">
          <WidgetSelector widget={widgetPositions[`M${side}`]} size={Usize} data={data} />
        </Grid>
      </Grid>)
  }
  else {
    if (Usize === 'L') {
      Usize = ''
    }
    else if (Bsize === 'L') {
      Bsize = ''
    }
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
// }

/**
  * Component for creating the WAD.
  * @component
  * @category WAD
  * @return WAD
  */
function WAD() {

  // States to manage data with/without X-Plane
  const [myAirPlaneData, setMyAirPlaneData] = useState();
  const [aiPlaneData, setAiPlaneData] = useState();
  const [widgetData, setWidgetData] = useState({});
  const [offlineData, setOfflineData] = useState();

  /**
   * States to keep track of layout.
   * Since states are needed to be updated on button press inside a useEffect useRef are
   * used for every state that needs to be updated with a button press.
   */

  // States to keep track of widget sizes
  const [UL, _setUL] = useState('');
  const UL_Ref = useRef(UL);
  const setUL = state => { UL_Ref.current = state; _setUL(state) }

  const [BL, _setBL] = useState('');
  const BL_Ref = useRef(BL);
  const setBL = state => { BL_Ref.current = state; _setBL(state) }

  const [UR, _setUR] = useState('');
  const UR_Ref = useRef(UR);
  const setUR = state => { UR_Ref.current = state; _setUR(state) }

  const [BR, _setBR] = useState('');
  const BR_Ref = useRef(BR);
  const setBR = state => { BR_Ref.current = state; _setBR(state) }


  const [selectedWidget, _setSelectedWidget] = useState("");
  const selectedWidgetRef = useRef(selectedWidget);
  const setSelectedWidget = state => { selectedWidgetRef.current = state; _setSelectedWidget(state) }


  const [selectedWidgetPos, _setSelectedWidgetPos] = useState('1')
  const selectedWidgetPosRef = useRef(selectedWidgetPos);
  const setSelectedWidgetPos = state => { selectedWidgetPosRef.current = state; _setSelectedWidgetPos(state) }

  const [widgetPositions, _setWidgetPositions] = useState({ UL: null, ML: null, BL: null, UR: null, MR: null, BR: null });
  const widgetPositionsRef = useRef(widgetPositions);
  const setWidgetPositions = state => { widgetPositionsRef.current = state; _setWidgetPositions(widgetPositions) }


  const [activeBtn, _setActiveBtn] = useState('');
  const activeBtnRef = useRef(activeBtn);
  const setActiveBtn = state => { activeBtnRef.current = state; _setActiveBtn(state) }

  const [selecterMode, _setSelecterMode] = useState(0);
  const selecterModeRef = useRef(selecterMode)
  const setSelecterMode = state => {
    if (state === 0) setSelecter('1')
    else if (state === 1) setSelecter(WIDGET_ORDER[1])
    selecterModeRef.current = state;
    _setSelecterMode(state);
  }

  const [selecter, _setSelecter] = useState('1');
  const selecterRef = useRef(selecter)
  const setSelecter = state => { selecterRef.current = state; _setSelecter(state) }
  const [show, setShow] = useState(true)


  /**
   * Handles key on pressed events.
   * All parents functions needs to be passed along into updater function (buttonNavigator)
   * @function
   * @category keynavigation
   * @param {event} event 
   */
  function handleKeyDown(e) {
    console.log("key: ", e.key)
    buttonNavigator(e.key, selecterModeRef.current, selecterRef.current, setSelecter, setSelecterMode, setActiveBtn, updateWidgetPos, setUL, setUR, setBL, setBR, setSelectedWidgetPos, updateViewMode);
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

    if (side === 'left') {
      setWidgetPositions({ ...widgetPositionsRef.current, UL: null, ML: null, BL: null })
      setWidgetData({})
    }
    else if (side === 'right') {
      setWidgetPositions({ ...widgetPositionsRef.current, UR: null, MR: null, BR: null })
      setWidgetData({})
    }
  }


  /**
   * Function to update widget's position
   * @function
   * @param {string} widget name of widget
   */
  const updateWidgetPos = (widget) => {
    console.log("Update: ", widget)
    setSelectedWidget(widget) // update selected widget
    setWidgetPositions({ ...widgetPositionsRef.current, [selectedWidgetPosRef.current]: widget }) // use param (widget) instead of state as it may not be updated
  }

  // Use myAirPlaneData from xplane
  useEffect(() => {
    if (USE_XPLANE_DATA) {
      const interval = setInterval(() => {
        fetchData("env", setAiPlaneData)
        fetchData("plane", setMyAirPlaneData)
        fetchWidgetData("pfd", setWidgetData, widgetData)
        fetchWidgetData("weights", setWidgetData, widgetData)
        if (myAirPlaneData.altitude < 500 && myAirPlaneData.pitch < - 60) {
          setShow(true)
        }
        else {
          setShow(false)
        }
      }, 200);
      return () => clearInterval(interval);
    }

  }, [])

  // pitch -70, höjd 500 meter 

  // Use offline data
  useEffect(() => {
    if (!USE_XPLANE_DATA) {
      const interval = setInterval(() => {
        UpdateOfflineData(offlineData, setOfflineData); // change data with Offline
        setWidgetData(offlineData)
      }, 15); // how many ms between each update

      return () => clearInterval(interval); // Unmount function to prevent memory leaks.
    }
  })


  function updateViewMode(mode) {
    setWidgetPositions(mode.widgets)
    setUL(mode.sizes.UL)
    setBL(mode.sizes.BL)
    setUR(mode.sizes.UR)
    setBR(mode.sizes.BR)
  }

  return (
    <Grid container className="wad_frame">
      <Grid container className="wad_content">
        <Grid item className="map_item" xs={12}>
          {/* Map */}
          <ArcGisMap zoom={8} myAirPlaneData={myAirPlaneData} aiPlaneData={aiPlaneData} offlineData={offlineData} />
        </Grid>

        {/*Warning overlay*/} 
        <Grid contatiner className="overlay_container_warn" display={{xs: show? '':'none'}} style={{backgroundColor: 'rgb(69, 69, 69, 0.7)'}}>
        <Grid item xs={4} style={{padding: '0px', margin: '0px', display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
            <img src={arrowUp} className="warning_arrow" style={{width: '80%', display: 'flex', alignContent: 'center', justifyContent: 'center'}}/>
          </Grid>
          <Grid item xs={4} style={{padding: '0px', margin: '0px', display: 'flex'}}>
            <img src={arrowUp} className="warning_arrow" style={{width: '80%', display: 'flex', alignContent: 'center', justifyContent: 'center'}}/>
          </Grid>
          <Grid item xs={4} style={{padding: '0px', margin: '0px', display: 'flex'}}>
            <img src={arrowUp} className="warning_arrow" style={{width: '80%', display: 'flex', alignContent: 'center', justifyContent: 'center'}}/>
          </Grid>
        </Grid>

        {/* Widgets */}
        <Grid container className="overlay_container">
          <Grid item xs={3}>
            <GridType Usize={UL} Bsize={BL} container={'left_container'} data={widgetData} side={"L"} widgetPositions={widgetPositionsRef.current} />
          </Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={3}>
            <GridType Usize={UR} Bsize={BR} container={'right_container'} data={widgetData} side={"R"} widgetPositions={widgetPositionsRef.current} />
          </Grid>
        </Grid>


        {/* Buttons */}
        <Grid item position="absolute" top={'0'} right={'0'} style={{ zIndex: '3' }}>
          <ExtendableButtons />
        </Grid>
        <Grid item position="absolute" bottom={'0'} style={{ zIndex: '3', width: "94%" }}>
          <WidgetButtons update={updateWidgetPos} selecter={selecter} reset={cleanUp} />
          {/* <button className="button-30" role="button" onClick={() => { cleanUp('left') }}>Reset Left side</button> */}
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