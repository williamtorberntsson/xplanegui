import { Grid, Button } from '@mui/material';
import { useState } from "react";

const BoxButtons = (props) => {

  // const [box, setBox] = useState(0);

  // const handleClick = (mode) => {
  //   props.lightTheme(mode);
  //   setMode(mode);
  // }

   const handleClick = (box) => {
    props.activeBox(box);
    // props.activeBox(box)
    // setBox(box);
  }

  // const changeView = (view) => {
  //   props.viewMode(view);
  // }

  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly', width: '35vw', paddingBottom: '1.5vh'}}>
      <button className="button-30" onClick={() => { handleClick(1) }} role="button">UL</button>
      <button className="button-30" onClick={() => { handleClick(2) }} role="button">BL</button>
      <button className="button-30" onClick={() => { handleClick(3) }} role="button">UR</button>
      <button className="button-30" onClick={() => { handleClick(4) }} role="button">BR</button>
    </div>
  )
};


const WidgetButtons = (props) => {

  // const [mode, setMode] = useState(0);
  // const [widgetType, setWidgetType] = useState('')

  // const handleClick = (mode) => {
  //   props.lightTheme(mode);
  //   setMode(mode);
  // }

  const handleClick = (widgetType) => {
    props.activeWidget(widgetType);
    // setWidgetType(widgetType)
  }

  // const changeView = (view) => {
  //   props.viewMode(view);
  // }

  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly', width: '40vw', paddingBottom: '1.5vh'}}>
      {/* <Button onClick={() => { handleClick(0) }} variant="contained">Light mode</Button>
      <Button onClick={() => { handleClick(1) }} variant="contained">Dark mode</Button>
      <Button onClick={() => { changeView(1) }} variant="contained">Change View</Button> */}
      <button className="button-30" onClick={() => { handleClick('PFD') }} role="button">PFD</button>
      <button className="button-30" onClick={() => { handleClick('COMP') }} role="button">COMP</button>
      <button className="button-30" onClick={() => { handleClick('EFIS') }} role="button">EFIS</button>
      <button className="button-30" onClick={() => { handleClick('None') }} role="button">None</button>
    </div>
  )
};

const ExtendableButtons = () => {


  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly', width: '100vw', paddingTop: '1.3vh'}}>
      {/* <Button onClick={() => { handleClick(0) }} variant="contained">Light mode</Button>
      <Button onClick={() => { handleClick(1) }} variant="contained">Dark mode</Button>
      <Button onClick={() => { changeView(1) }} variant="contained">Change View</Button> */}
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
    </div>
  )
};

export {BoxButtons, WidgetButtons, ExtendableButtons};