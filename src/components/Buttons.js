import { Grid, Button } from '@mui/material';
import { useState } from "react";

const BoxButtons = (props) => {

  return (
    <div style={{display: 'flex', flexDirection:'column', justifyContent: 'space-between', width: '1.5vw', height: '87vh'}}>
      <button className="button-40" onClick={() => { props.U('s')}} role="button"></button>
      <button className="button-40" onClick={() => { props.U('m')}} role="button"></button>
      <button className="button-40" onClick={() => {props.U('L'); props.B('L')}} role="button"></button>
      <button className="button-40" onClick={() => { props.B('m')}} role="button"></button>
      <button className="button-40" onClick={() => {props.B('s')}} role="button"></button>
    </div>
  )
};


const WidgetButtons = (props) => {

  const handleClick = (widgetType) => {
    props.activeWidget(widgetType);
  }

  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly', width: '30vw', paddingBottom: '1.5vh'}}>
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