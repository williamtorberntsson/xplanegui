import React from "react";

import { FiBox, SpeedMechanics, FiNeedle, FiCircle, TestCircle } from "../images";
import "../assets/css/flightindicators.css"

const AirSpeed = (props) => {
  let constants = {
    pitch_bound: 30,
    vario_bound: 1.95,
    airspeed_bound_l: 0,
    airspeed_bound_h: 160
  };
  let speed = props.speed;
  //if (speed > constants.airspeed_bound_h) speed = constants.airspeed_bound_h;
  if (speed < constants.airspeed_bound_l) speed = constants.airspeed_bound_l;
  let speedRad = speed * (Math.PI / 180); //90 + speed * 2;

  return (
    <span id="airspeed">
      <div className="instrument airspeed" style={{ height: "200px", width: "200px" }}>
        <img src={TestCircle} className="box" />
        <div className="speed box" style={{ transform: `translate(${-35*Math.cos(-speedRad + Math.PI)}px, ${-35*Math.sin(-speedRad + Math.PI)}px) rotate(${-speedRad + Math.PI}rad)` }}>
          <img src={FiNeedle} className="box" />
        </div>
        <div className="value">
          <p>{speed}</p>
        </div>
      </div>
    </span>
  );
};

export default AirSpeed;
