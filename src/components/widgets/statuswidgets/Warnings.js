import React from "react";

/**
 * A widget that shows warnings for airplane for every active warning.
 * If no warnings are active this shows nothing.
 * @component
 * @param {string} size size of widget
 * @param {dictionary} data data for widget
 * @todo add support for multiple sizes
 * @todo add more/other info  
 * @returns widget that show airplane statuses 
 */
const Warnings = ({ size, data }) => {

  if (data) {
    // corresponding messages to values
    const Messages = {
      speedbrake: "Speedbrake DEPLOYED",
      ice: "Ice DETECTED",
      transonic: "APPROACHING TRANSONIC"
    }
    return (
      <div>
        <p>Warnings: </p>
        {Object.keys(data).map(function(key, index) {
          if(data[key] == 1) return <p id={index}>{Messages[key]}</p>
        })}
      </div>
    )
  } else {
    return <h1>Loading...</h1>
  }
}
export default Warnings;