
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
  data.ice = 1;
  data.speedbrake = 1;
  data.transonic = 1;
  if (data) {
    // corresponding messages to values
    const Messages = {
      speedbrake: "Speedbrake DEPLOYED",
      ice: "Ice DETECTED",
      transonic: "APPROACHING TRANSONIC"
    }

    if (size === 'L') {
      return (<div className={styles.L}>
        <p>WARNING: </p>
        {Object.keys(data).map(function (key, index) {
          if (data[key] === 1) return <p className={styles.warning} id={index}>{Messages[key]}</p>
          else return null
        })}
      </div>)
    }
    else if (size === 'M') {
      return (<div className={styles.M}>
        <p>WARNING: </p>
        {Object.keys(data).map(function (key, index) {
          if (data[key] === 1) return <p key={key} className={styles.warning} id={index}>{Messages[key]}</p>
          else return null
        })}
      </div>)
    }

    else if (size === 'S') {
      return (
        <div className={styles.S}>
          <p>WARNING: </p>
          {Object.keys(data).map(function (key, index) {
            if (data[key] === 1) return <p key={key} className={styles.warning} id={index}>{Messages[key]}</p>
            else return null
          })}
        </div>
      )
    }
  } else {
    return <h1>Loading...</h1>
  }
}
export default Warnings;