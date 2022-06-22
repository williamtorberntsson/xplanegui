import React from "react";
import { HorizonBack, HorizonBall, HorizonCircle, HorizonMechanics } from "../images";

const Attitude = (props) => {
  let constants = {
    pitch_bound: 30,
    vario_bound: 1.95,
    airspeed_limit_l: 0,
    airspeed_limit_h: 800
  };
  let roll = props.roll;
  let pitch = props.pitch;

  if (pitch > constants.pitch_bound) pitch = constants.pitch_bound;
  else if (pitch < -constants.pitch_bound) pitch = -constants.pitch_bound;

  pitch *= 0.7;

  return (
    <span id="attitude">
      <div className="instrument attitude" style={{ height: "200px", width: "200px" }}>
        <div className="roll box" style={{ transform: `rotate(${roll}deg)` }}>
          <img src={HorizonBack} className="box" />
          <div className="pitch box" style={{ top: `${pitch}%` }}>
            <img src={HorizonBall} className="box" />
          </div>
          <img src={HorizonCircle} className="box" />
        </div>
        <div className="mechanics box">
          <img src={HorizonMechanics} className="box" />
        </div>
      </div>
    </span>
  );
};
export default Attitude;
