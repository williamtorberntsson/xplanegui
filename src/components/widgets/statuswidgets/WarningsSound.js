
import React, { useEffect, useState } from "react";
import styles from "../../styles/Status.module.css"
import useAudio from "../../useAudio";
import useDeepEffect from "../../useDeepEffect";

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
  const [audio, play] = useAudio('warning.wav');

  // When data updates play warning sound if any warnings
  useDeepEffect(() => {
    for (const [key, value] of Object.entries(data)) {
      
      if(data[key] === 1){
        console.log("key: ", key, " value: ", value)
        play();
        break;
      }
    }
  }, [data])

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

  // Display warning with corresponding Message if value is 1.
  return (<div className={styling}>
    <p>WARNING: </p>
    {Object.keys(data).map(function (key, index) {
      if (data[key] === 1) {
        return <p key={key} className={styles.warning} id={index}>{Messages[key]}</p>
      }
      else return null
    })}
  </div>)
}
export default Warnings;