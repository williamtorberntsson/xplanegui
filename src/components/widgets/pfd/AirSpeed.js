import React from "react";
import styles from "../../styles/AirSpeed.module.css";

import { VelocityMeterBlack, VelocityMeterWhite, VelocityPointerGrey, VelocityPointerRed } from "../../../images";

/**
 * A widget that shows the airspeed in both knots and mach (speedometer)
 * @component
 * @param {float} props.speed speed in m/s
 * @todo rewrite props to variables 
 * @returns a airspeed widget
 */
const AirSpeed = (props) => {
  let constants = {
    airspeed_limit_l: 0,
    airspeed_0_to_1: 100,
    airspeed_1_to_2: 200,
    airspeed_limit_h: 900
  };

  let speed = props.speed * 1.94384; // m/s to knots
  let speedRad = 0;
  const mach = props.speed / 340.29;


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
    <div className={styles.airspeed}>
      <img className={styles.meter} src={VelocityMeterBlack} />
      <div className={styles.dial} style={{ transform: `rotate(${speedRad}rad)` }}>
        <img src={VelocityPointerGrey} />
      </div>
      <div className={styles.value}>
        <p>M</p>
        <p>{mach.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default AirSpeed;
