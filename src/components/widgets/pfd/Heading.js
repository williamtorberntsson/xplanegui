import React from "react";
import { Compass } from "../../../images";
import styles from "../../styles/Heading.module.css"

/**
 * A tape compass widget 
 * @component
 * @category Widget
 * @subcategory PFD
 * @prop {heading} heading direction in degrees
 * @returns heading widget
 */
const Heading = ({heading}) => {
  const calc_heading = heading * (93.3-6.7) / 360 + 6.7; // fit heading to svg

  return (
    <div className={styles.compass_mask}>
      <div className={styles.compass_value_border}>
        <p className={styles.compass_value}>{heading.toFixed(0)}</p>
      </div>
      <img className={styles.compass} style={{ objectPosition: `${calc_heading}% 0` }} src={Compass} />
    </div>
  );
};
export default Heading;
