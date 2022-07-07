import React from "react";

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