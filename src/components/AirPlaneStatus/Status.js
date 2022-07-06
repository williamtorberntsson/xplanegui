import React from "react";

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