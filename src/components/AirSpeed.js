import React from "react";

import { FiBox, SpeedMechanics, FiNeedle, FiCircle, AltitudeMeterBlack, Test1, Test2 } from "../images";
import "../assets/css/flightindicators.css"

const AirSpeed = (props) => {
  let constants = {
    pitch_bound: 30,
    vario_bound: 1.95,
    airspeed_limit_l: 0,
    airspeed_limit_h: 800
  };

  let speed = props.speed; // m/s
  if (speed > constants.airspeed_limit_h) speed = constants.airspeed_limit_h;
  else if (speed < constants.airspeed_limit_l) speed = constants.airspeed_limit_l;

  let speedRad = speed * (2*Math.PI - Math.PI/6)/800;
  let dialRad = speedRad + Math.PI/2;

  return (
    <span id="airspeed">
      <div className="instrument airspeed" style={{ height: "200px", width: "200px" }}>
        <img src={AltitudeMeterBlack} className="box" />
        <div className="speed box" style={{ transform: `translate(${-35*Math.cos(dialRad)}px, ${-35*Math.sin(dialRad)}px) rotate(${dialRad}rad)` }}>
          <img src={FiNeedle} className="box" />
        </div>
        <div className="value">
          <p>{speed} m/s</p>
        </div>
      </div>
    </span>
  );
};

export default AirSpeed;
