import React from "react";
import { HorizonBack, HorizonBall, HorizonCircle, HorizonMechanics, HorizonPitch } from "../images";

const Attitude = (props) => {
  let constants = {
    pitch_bound: 90,
    vario_bound: 1.95,
  };
  let roll = props.roll;
  let pitch = props.pitch;

  // limit pitch between 0 and 90
  if (pitch > constants.pitch_bound) pitch = constants.pitch_bound;
  else if (pitch < -constants.pitch_bound) pitch = -constants.pitch_bound;

  pitch = - 60.8 / 90 * pitch + 50; // fit values to svg

  return (
    <div>
      <div className="attitude instrument">

        <div className="box" style={{ transform: `rotate(${roll}deg)` }}>
          <img src={HorizonBack} className="horizonback" />

          <div className="pitch-mask">
            <img src={HorizonPitch} className="pitch" style={{ objectPosition: `0 ${pitch}%` }} />
          </div>

          <img src={HorizonCircle} className="horizoncircle" />
        </div>

        <div className="mechanics box">
          <img src={HorizonMechanics} className="box" />
        </div>
      </div>
    </div>
  );
};
export default Attitude;
