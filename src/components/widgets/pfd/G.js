import React from "react";
import styles from "../../styles/G.module.css";

/**
 * A widget that shows the current total acceleration (g-forces)
 * @component
 * @category Widget
 * @subcategory PFD
 * @prop {float} ax acceleration for x-axis
 * @prop {float} ay acceleration for y-axis
 * @prop {float} az acceleration for z-axis
 * @todo make sure it works
 * @returns alpha widget
 */
const Alpha = ({ ax, ay, az }) => {
  const totalG = Math.sqrt(ax ** 2 + ay ** 2, az ** 2);

  return (
    <div className={styles.g}>
      <span>G</span>
      <span>{totalG.toFixed(1)}</span>
    </div>
  )
}
export default Alpha;