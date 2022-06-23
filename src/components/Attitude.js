import React from "react";
import { HorizonBack, HorizonBall, HorizonCircle, HorizonMechanics } from "../images";

const Attitude = (props) => {
  let constants = {
    pitch_bound: 30,
    vario_bound: 1.95,
  };
  let roll = props.roll;
  let pitch = props.pitch;

  // limit pitch between 0 and 30
  if (pitch > constants.pitch_bound) pitch = constants.pitch_bound;
  else if (pitch < -constants.pitch_bound) pitch = -constants.pitch_bound;

  pitch *= 0.7;

  return (
    <div>
      <div className="instrument attitude" style={{ height: "230px", width: "230px" }}>
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
    </div>
  );
};
export default Attitude;
