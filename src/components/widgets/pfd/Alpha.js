import React from "react";
import styles from "../../styles/Alpha.module.css";

/**
 * A widget that displays the current angle of attack (AOT)
 * @component
 * @prop {float} alpha alpha (AOT angle) 
 * @returns alpha widget
 */
const Alpha = ({alpha}) => {
  return (
    <div className={styles.alpha}>
      <span>&alpha;</span>
      <span>{alpha ? Math.abs(alpha).toFixed(0) : 0}</span>
    </div>
  )
}
export default Alpha;