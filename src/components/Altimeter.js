import React from "react";
import "../assets/css/flightindicators.css"

import { AltitudeMeterBlack, AltitudeMeterWhite, AltitudePointerGrey, AltitudePointerRed } from "../images";

const Altimeter = (props) => {
  let needle = 180 + ((props.altitude % 1000) * 360) / 1000;
  //let needleSmall = (props.altitude / 10000) * 360;
  //let pressure = 2 * props.pressure - 1980;

  return (
    <span id="altimeter">
      <div className="instrument altimeter" style={{ height: "200px", width: "200px" }}>
        <img src={props.lightTheme ? AltitudeMeterWhite : AltitudeMeterBlack} className="box" />
        <div className="needle box" style={{ transform: `translate(${50 * Math.cos((needle + 90) * (Math.PI / 180))}px, ${50 * Math.sin((needle + 90) * (Math.PI / 180))}px) rotate(${needle}deg) scale(0.4)` }}>
          <img src={props.lightTheme ? AltitudePointerRed : AltitudePointerGrey} className="box" />
        </div>
        <div className="altitude" style={{ color: props.lightTheme ? "white" : "black" }}>
          <span style={{fontSize: "20px"}}>{Math.floor(props.altitude / 1000)}</span>
          <span style={{ fontSize: "15px" }}>{props.altitude % 1000}</span>
        </div>
      </div>
    </span>
  );
};

export default Altimeter;
