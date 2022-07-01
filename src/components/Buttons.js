import { Grid, Button } from '@mui/material';
import { useState } from "react";

const WidgetButtons = (props) => {

  const [mode, setMode] = useState(0);

  const handleClick = (mode) => {
    props.lightTheme(mode);
    setMode(mode);
  }

  const changeView = (view) => {
    props.viewMode(view);
  }

  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly', width: '40vw', paddingBottom: '1vh'}}>
      {/* <Button onClick={() => { handleClick(0) }} variant="contained">Light mode</Button>
      <Button onClick={() => { handleClick(1) }} variant="contained">Dark mode</Button>
      <Button onClick={() => { changeView(1) }} variant="contained">Change View</Button> */}
      <button class="button-30" onClick={() => { handleClick(0) }} role="button">PFD</button>
      <button class="button-30" onClick={() => { handleClick(1) }} role="button">COMP</button>
      <button class="button-30" onClick={() => { handleClick(1) }} role="button">EFIS</button>
      <button class="button-30" onClick={() => { changeView(1) }} role="button">None</button>
    </div>
  )
};

const BoxButtons = (props) => {

  const [mode, setMode] = useState(0);

  const handleClick = (mode) => {
    props.lightTheme(mode);
    setMode(mode);
  }

  const changeView = (view) => {
    props.viewMode(view);
  }

  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly', width: '35vw', paddingBottom: '1vh'}}>
      <button class="button-30" onClick={() => { handleClick(0) }} role="button">UL</button>
      <button class="button-30" onClick={() => { handleClick(1) }} role="button">BL</button>
      <button class="button-30" onClick={() => { changeView(1) }} role="button">UR</button>
      <button class="button-30" onClick={() => { changeView(1) }} role="button">BR</button>
    </div>
  )
};

export {BoxButtons, WidgetButtons};