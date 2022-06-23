import React from "react";

import {VelocityMeterBlack, VelocityMeterWhite, VelocityPointerGrey, VelocityPointerRed } from "../images";
import "../assets/css/flightindicators.css"

const AirSpeed = (props) => {
  let constants = {
    airspeed_limit_l: 0,
    airspeed_0_to_1: 100,
    airspeed_1_to_2: 200,
    airspeed_limit_h: 900
  };

  console.log("Airspeed mode: ", props.lightTheme)

  let speed = props.speed; // m/s
  let speedRad = 0;

  // Limit speed between 0 and 800
  if (speed > constants.airspeed_limit_h) speed = constants.airspeed_limit_h;
  else if (speed < constants.airspeed_limit_l) speed = constants.airspeed_limit_l;

  switch (true) {
    case speed >= constants.airspeed_limit_l && speed < constants.airspeed_0_to_1: // between 0 and 1
      speedRad = speed * (360 * (Math.PI / 180) - 36 * (Math.PI / 180)) / 900;
      break;
    case speed >= constants.airspeed_0_to_1 && speed <= constants.airspeed_1_to_2: // between 1 and 2
      speedRad = (speed - 100) * 36 * 2 * (Math.PI / 180) / 100 + 36 * (Math.PI / 180);
      break;
    case speed > constants.airspeed_1_to_2 && speed <= constants.airspeed_limit_h: // between 2 and 9
      speedRad = speed * (360 * (Math.PI / 180) - 36 * (Math.PI / 180)) / 900 + 36 * (Math.PI / 180);;
      break;
    default:
      speedRad = speed * (360 * (Math.PI / 180) - 36 * (Math.PI / 180)) / 900;
      break;
  }

  return (
    <span id="airspeed">
      <div className="instrument airspeed" style={{ height: "200px", width: "200px" }}>
        <img src={props.lightTheme ? VelocityMeterWhite : VelocityMeterBlack} className="box" />
        <div className="speed box" style={{ transform: `rotate(${speedRad}rad)` }}>
          <img src={props.lightTheme ? VelocityPointerRed : VelocityPointerGrey} className="box" />
        </div>
        <div className="value" style={{color: props.lightTheme ? "white" : "black"}}>
          <p>{speed}</p>
        </div>
      </div>
    </span>
  );
};

export default AirSpeed;
