import React from "react";

const Status = ({ size, data }) => {

  try {
    return (
      <div>
        <p>Speedbrake <span style={{color: data.speedbrake ? "red" : "black"}}>{data.speedbrake ? "ON" : "OFF"}</span></p>
        <p>Outside Air Temp {data.status.temperature.outside.toFixed(1)} °C</p>
      </div>
    )
  } catch {
    return <h1>Loading...</h1>
  }
}
export default Status;