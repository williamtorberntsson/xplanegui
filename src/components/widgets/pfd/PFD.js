import React from "react";
import { useState, useEffect } from "react";
import styles from "../../styles/PFD.module.css"
import AirSpeed from "./AirSpeed";
import Altimeter from "./Altimeter";
import Attitude from "./Attitude";
import Heading from "./Heading";
import Alpha from "./Alpha";
import G from "./G";

/**
 * Creates a PFD (primary flight display) with the help of smaller instruments
 * @component
 * @param {dictinary} data data for widget
 * @param {string} size size for widget
 * @returns pfd
 */
const PFD = ({ data, size }) => {

  const [inData, setInData] = useState();

  if (!data) {
    data = {
      "longitude": 15.680926012604708,
      "latitude": 58.41157469382408,
      "groundspeed": 0,
      "true_airspeed": 0,
      "true_heading": 0,
      "altitude": 0,
      "pitch": 0,
      "roll": 0,
      "alpha": 0
    }
  }

  // Medium size widget
  if (size === "M") {
    return (
      <div className={styles.pfd}>
        <div className={styles.mouseears}>
          <AirSpeed speed={data.true_airspeed} />
          <Altimeter altitude={data.altitude} />
        </div>
        <div className={styles.mousehead}>
          <div className={styles.side_values}>
            <Alpha alpha={5} />
            <G ax={1} ay={1} az={0.5} />
          </div>
          <div className={styles.heading_attitude}>
            <Attitude roll={data.roll} pitch={data.pitch} />
            <Heading heading={data.true_heading} />
          </div>
        </div>
      </div>
    );
  } else if (size === "S") { // small size widget
    return (
      <div className={styles.mouseears}>
        <Attitude roll={data.roll} pitch={data.pitch} width="200px" height="200px"/>
        <Altimeter altitude={data.altitude} width="200px" height="200px"/>
      </div>
    )
  }
}

export default PFD;