import React from "react";
import { useState, useEffect } from "react";
import styles from "./styles/PFD.module.css"
import AirSpeed from "./AirSpeed";
import Altimeter from "./Altimeter";
import Attitude from "./Attitude";
import Heading from "./Heading";
import Alpha from "./Alpha";
import G from "./G";

const PFD = ({ lightTheme, useXplaneData, data }) => {

  const [altitude, setAltitude] = useState(0)
  const [roll, setRoll] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [heading, setHeading] = useState(0);


  // Offline data: change values
  useEffect(() => {
    if (!useXplaneData) {
      const interval = setInterval(() => {
        setRoll(roll);
        setPitch((pitch + 0.1) % 90);
        setAltitude((altitude + 1));
        setSpeed((altitude + 0.1) % 463);
        setHeading((heading + 0.1) % 360);
      }, 20);

      return () => {
        clearInterval(interval);
      };
    }
  });

  return (
    <div className={styles.pfd}>
      <div className={styles.mouseears}>
        <AirSpeed speed={data ? data.true_airspeed : speed} lightTheme={lightTheme} />
        <Altimeter altitude={data ? data.altitude : altitude} pressure={5} lightTheme={lightTheme} />
      </div>
      <div className={styles.mousehead}>
        <div className={styles.side_values}>
          <Alpha alpha={5} />
          <G ax={1} ay={1} az={0.5} />
        </div>
        <div className={styles.heading_attitude}>
          <Attitude roll={data ? data.roll : roll} pitch={data ? data.pitch : pitch} />
          <Heading heading={data ? data.heading : heading} />
        </div>
      </div>
    </div>
  );
}

export default PFD;