import { Grid, Button } from '@mui/material';
import { useState } from "react";

const BoxButtonB = (props) => {

  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly', width: '25vw', paddingBottom: '1.5vh'}}>
      <button className="button-30" onClick={() => {props.UL('L'); props.BL('L')}} role="button"></button>
    </div>
  )
};

const BoxButtonSide = (props) => {

  return (
    <div style={{display: 'flex', flexDirection:'column', justifyContent: 'space-between', width: '2vw', height: '85vh'}}>
      <button className="button-40" onClick={() => { props.U('s')}} role="button"></button>
      <button className="button-40" onClick={() => { props.U('m')}} role="button"></button>
      <button className="button-40" onClick={() => { props.B('m')}} role="button"></button>
      <button className="button-40" onClick={() => {props.B('s')}} role="button"></button>
      {/* <button className="button-30" onClick={() => { props.UL('L')}} role="button">L</button> */}
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
  }

  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly', width: '30vw', paddingBottom: '1.5vh'}}>
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

export {BoxButtonB, BoxButtonSide, WidgetButtons, ExtendableButtons};