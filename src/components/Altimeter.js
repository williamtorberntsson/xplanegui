import React from "react";
import styles from "./styles/Altimeter.module.css";

import { AltitudeMeterBlack, AltitudeMeterWhite, AltitudePointerGrey, AltitudePointerRed } from "../images";

const Altimeter = (props) => {
  const altitude_feet = props.altitude * 3.2808399; // m to feet
  const needle = 180 + ((altitude_feet % 1000) * 360) / 1000;
  const alt_thousand = (Math.floor(altitude_feet / 1000)).toFixed(0)
  const alt_hundred = (altitude_feet % 1000).toFixed(0)

  return (
    <div className={styles.altimeter} style={{width: props.width, height: props.height}}>
      <img className={styles.meter} src={AltitudeMeterBlack} />
      <div className={styles.dial} style={{
          transform: `translate(${35 * Math.cos((needle + 90) * (Math.PI / 180))}%,
          ${35 * Math.sin((needle + 90) * (Math.PI / 180))}%) rotate(${needle}deg) scale(0.4)` }}> {/* translate and rotate needle in a circle */} 
        <img src={AltitudePointerGrey} />
      </div>
      <div className={styles.value}>
        <span className={styles.thousand}>{alt_thousand}</span>
        <span className={styles.hundred}>{('00' + alt_hundred).substring(alt_hundred.length + 2 - 3)}</span> {/*always display 3 numbers for hundred value*/}
      </div>
    </div>
  );
};

export default Altimeter;
