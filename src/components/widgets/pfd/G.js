import React from "react";
import styles from "../../styles/G.module.css";

/**
 * A widget that shows the current total acceleration (g-forces)
 * @component
 * @param {float} ax acceleration for x-axis
 * @param {float} ay acceleration for y-axis
 * @param {float} az acceleration for z-axis
 * @todo make sure it works
 * @returns a alpha widget
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