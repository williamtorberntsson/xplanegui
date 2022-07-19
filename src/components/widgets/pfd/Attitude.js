import React from "react";
import styles from "../../styles/Attitude.module.css";
import { HorizonBack, HorizonCircle, HorizonMechanics, HorizonPitch } from "../../../images";

/**
 * A widget that shows the current attitude
 * @component
 * @prop {props} props 
 * @todo rewrite props to variables
 * @todo remove width/height as paramater
 * @returns attitude widget
 */
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
    <div className={styles.attitude} style={{width: props.width, height: props.height, transform: `rotate(${roll}deg)` }}>
        <img className={styles.horizonback} src={HorizonBack} alt=""/>

        <div className={styles.pitch_mask}>
          <img className={styles.pitch} src={HorizonPitch} style={{ objectPosition: `0 ${pitch}%` }} alt="" />
        </div>
        <img className={styles.horizoncircle} src={HorizonCircle} alt="" />
        <img className={styles.mechanics} src={HorizonMechanics} alt="" />
      </div>
  );
};
export default Attitude;
