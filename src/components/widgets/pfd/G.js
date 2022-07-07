import React from "react";
import styles from "../../styles/G.module.css";

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