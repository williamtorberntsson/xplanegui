import React from "react";

import { AltitudeMeterBlack, AltitudeMeterWhite, AltitudePointerGrey, AltitudePointerRed } from "../images";

const Altimeter = (props) => {
  const altitude_feet = props.altitude * 3.2808399; // m to feet
  const needle = 180 + ((altitude_feet % 1000) * 360) / 1000;
  const alt_thousand = (Math.floor(altitude_feet / 1000)).toFixed(0)
  const alt_hundred = (altitude_feet % 1000).toFixed(0)

  return (
    <span id="altimeter">
      <div className="instrument altimeter" style={{ height: "200px", width: "200px" }}>
        <img src={props.lightTheme ? AltitudeMeterWhite : AltitudeMeterBlack} className="box" />
        <div className="needle box" style={{ transform: `translate(${50 * Math.cos((needle + 90) * (Math.PI / 180))}px, ${50 * Math.sin((needle + 90) * (Math.PI / 180))}px) rotate(${needle}deg) scale(0.4)` }}>
          <img src={props.lightTheme ? AltitudePointerRed : AltitudePointerGrey} className="box" />
        </div>
        <div className="altitude" style={{ color: props.lightTheme ? "white" : "black" }}>
          <span className="thousand" style={{ fontSize: "25px" }}>{alt_thousand}</span>
          <span className="hundred">{('00' + alt_hundred).substring(alt_hundred.length + 2 - 3)}</span> {/*always display 3 numbers for hundred value*/}
        </div>
      </div>
    </span>
  );
};

export default Altimeter;
