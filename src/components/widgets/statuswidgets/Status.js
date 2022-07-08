import React from "react";

/**
 * A widget that shows statuses for airplane
 * @component
 * @param {string} size size of widget
 * @todo add support for multiple sizes
 * @todo add more/other info  
 * @returns widget that show airplane statuses 
 */
const Status = ({ size, data }) => {

  if (data) {
    return (
      <div>
        <p>Speedbrake <span style={{color: data.speedbrake ? "red" : "black"}}>{data.speedbrake ? "ON" : "OFF"}</span></p>
        <p>Outside Air Temp {data.temperature.outside.toFixed(1)} °C</p>
      </div>
    )
  } else {
    return <h1>Loading...</h1>
  }
}
export default Status;