
import React from "react";
import styles from "../../styles/Status.module.css"

/**
 * A widget that shows warnings for airplane for every active warning.
 * Only shows warnings that are triggered.
 * @component
 * @category Widget
 * @subcategory Status Widget
 * @prop {string} size size of widget
 * @prop {dictionary} data data for widget
 * @todo add more/other info  
 * @returns airplane warnings widget
 */
const Warnings = ({ size, data }) => {

  // these are only set to test warnings
  //data.ice = 1;
  //data.transonic = 1;

  if (data) {
    // corresponding messages to values
    const Messages = {
      ice: "Ice DETECTED",
      transonic: "APPROACHING TRANSONIC"
    }

    let styling;
    if (size === 'L') {
      styling = styles.L
    } else if (size === 'M') {
      styling = styles.M
    } else if (size === 'S') {
      styling = styles.S
    }

    return (<div className={styling}>
      <p>WARNING: </p>
      {Object.keys(data).map(function (key, index) {
        if (data[key] === 1) return <p key={key} className={styles.warning} id={index}>{Messages[key]}</p>
        else return null
      })}
    </div>)
  } else return <h1>Loading...</h1>
}
export default Warnings;