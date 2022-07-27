import { React, useState, useEffect } from 'react';
import { BoxButtonsL, BoxButtonsR } from './buttons/BoxButtons';
import ResetButton from './buttons/ResetButtons';
import ExtendableButtons from './buttons/ExtendableButtons';
import WidgetButtons from './buttons/WidgetButtons';
import { Grid } from '@mui/material';
import UpdateOfflineData from './map/UpdateOfflineData';

import './WAD.css';
import WidgetSelector from './WidgetSelector';
import ArcGisMap from './map/ArcGisMap';
import { fetchData, fetchWidgetData } from './fetchData';
import { useXplaneData } from '../constants';


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
          <WidgetSelector widget={widgetPositions[`M${side}`]} size={Usize} data={data} useXplaneData={useXplaneData} />
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
    if (useXplaneData) {
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
    if(!useXplaneData){
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
        <Grid item position="absolute" bottom={'0'} style={{ zIndex: '3', display: 'flex', flexDirection: 'row', alignContent: 'space-between', justifyContent: 'center' }}>
          <button className="button-30" role="button" onClick={() => { cleanUp('left') }}>Reset Left side</button>
          <WidgetButtons update={updateWidgetPos} />
          <button className="button-30" role="button" onClick={() => { cleanUp('right') }}>Reset Right side</button>
        </Grid>
        <Grid item position="absolute" left={'1vh'} style={{ zIndex: '3' }}>
          <BoxButtonsL Usize={setUL} Bsize={setBL} selectedPos={setSelectedWidgetPos} side={"L"} arrow={'>'} />
        </Grid>
        <Grid item position="absolute" right={'1vh'} style={{ zIndex: '3' }}>
          <BoxButtonsR Usize={setUR} Bsize={setBR} selectedPos={setSelectedWidgetPos} side={"R"} arrow={'<'} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default WAD;