import React from "react";
import styles from "../../styles/Alpha.module.css";

const Alpha = ({alpha}) => {
  return (
    <div className={styles.alpha}>
      <span>&alpha;</span>
      <span>{alpha ? Math.abs(alpha).toFixed(0) : 0}</span>
    </div>
  )
}
export default Alpha;