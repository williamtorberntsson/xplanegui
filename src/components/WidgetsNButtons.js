import React, { useEffect, useState, useRef } from "react";
import { Grid } from "@mui/material";
import GridType from "./GridType";
import ExtendableButtons from "./buttons/ExtendableButtons";
import WidgetButtons from "./buttons/WidgetButtons";
import BoxButtons from "./buttons/BoxButtons";
import buttonNavigator from "../buttonNavigator";

import { WIDGET_ORDER } from "../settings";

/**
 * Creates layout for widgets and buttons
 * @component
 * @param {object} data data for widgets 
 * @returns widgets and buttons
 */
const WidgetsNButtons = ({ data }) => {

  /**
   * States to keep track of layout.
   * Since states are needed to be updated on button press inside a useEffect useRef are
   * used for every state that needs to be updated with a button press.
   */

  // States to keep track of widget sizes
  // Example: UL='S' means that upper left position has size small
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

  // Widget names at different positions. Example: UL='pfd' upper left has widget pfd
  const [widgetPositions, _setWidgetPositions] = useState({ UL: null, ML: null, BL: null, UR: null, MR: null, BR: null });
  const widgetPositionsRef = useRef(widgetPositions);
  const setWidgetPositions = state => { widgetPositionsRef.current = state; _setWidgetPositions(widgetPositions) }


  // position for currently selected widget, UL/BL...
  const [selectedWidgetPos, _setSelectedWidgetPos] = useState('')
  const selectedWidgetPosRef = useRef(selectedWidgetPos);
  const setSelectedWidgetPos = state => { selectedWidgetPosRef.current = state; _setSelectedWidgetPos(state) }


  // Currently selected button (blue border)
  const [selecter, _setSelecter] = useState('1')
  const selecterRef = useRef(selecter)
  const setSelecter = state => { selecterRef.current = state; _setSelecter(state) }
  const [show, setShow] = useState(false)

  // Recently pressed button (marked in green)
  const [activeBtn, _setActiveBtn] = useState('');
  const activeBtnRef = useRef(activeBtn);
  const setActiveBtn = state => { activeBtnRef.current = state; _setActiveBtn(state) }

  // Currently selected navigating mode
  // 0: Navigate through side buttons
  // 1: Navigate through widget buttons
  const [selecterMode, _setSelecterMode] = useState(0);
  const selecterModeRef = useRef(selecterMode)
  const setSelecterMode = state => {
    if (state === 0) setSelecter('1')
    else if (state === 1) setSelecter(WIDGET_ORDER[1])
    selecterModeRef.current = state;
    _setSelecterMode(state);
  }

  /**
   * Function to update widget's position
   * @function
   * @param {string} widget name of widget
   */
  const updateWidgetPos = (widget) => {
    console.log("Update: ", widget)
    setWidgetPositions({ ...widgetPositionsRef.current, [selectedWidgetPosRef.current]: widget })
  }

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
   * Function to clean widgets on each side
   * @function
   * @param {string} side side to reset
   */
  function cleanUp(side) {
    if (side === 'left') {
      setWidgetPositions({ ...widgetPositionsRef.current, UL: null, ML: null, BL: null })
    }
    else if (side === 'right') {
      setWidgetPositions({ ...widgetPositionsRef.current, UR: null, MR: null, BR: null })
    }
  }

  function updateViewMode(mode) {
    setWidgetPositions(mode.widgets)
    setUL(mode.sizes.UL)
    setBL(mode.sizes.BL)
    setUR(mode.sizes.UR)
    setBR(mode.sizes.BR)
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

  return (
    <React.Fragment>
      {/* Widgets */}
      < Grid container className="overlay_container" >
        <Grid item xs={3}>
          <GridType Usize={UL} Bsize={BL} container={'left_container'} data={data} side={"L"} widgetPositions={widgetPositionsRef.current} />
        </Grid>
        <Grid item xs={6}>
        </Grid>
        <Grid item xs={3}>
          <GridType Usize={UR} Bsize={BR} container={'right_container'} data={data} side={"R"} widgetPositions={widgetPositionsRef.current} />
        </Grid>
      </Grid >


      {/* Buttons */}
      < Grid item position="absolute" top={'0'} right={'0'} style={{ zIndex: '3' }}>
        <ExtendableButtons connect={"d"} />
      </Grid >
      <Grid item position="absolute" bottom={'0'} style={{ zIndex: '3', width: "94%" }}>
        <WidgetButtons update={updateWidgetPos} selecter={selecter} reset={cleanUp} />
      </Grid>
      <Grid item position="absolute" left={'1vh'} style={{ zIndex: '3' }}>
        <BoxButtons Usize={setUL} Bsize={setBL} selectedPos={setSelectedWidgetPos} side={"L"} arrow={'>'} activeBtn={activeBtn} btnUpdate={setActiveBtn} selecter={selecter} />
      </Grid>
      <Grid item position="absolute" right={'1vh'} style={{ zIndex: '3' }}>
        <BoxButtons Usize={setUR} Bsize={setBR} selectedPos={setSelectedWidgetPos} side={"R"} arrow={'<'} activeBtn={activeBtn} btnUpdate={setActiveBtn} selecter={selecter} />
      </Grid>
    </React.Fragment>
  )
}
export default WidgetsNButtons;