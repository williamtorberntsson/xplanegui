import React from "react";

const Weights = ({size, data}) => {

  if(data) {
    return (
      <div>
        <p>Fuel 1 {data.fuel1.toFixed(0)} KG</p>
        <p>Fuel 2 {data.fuel2.toFixed(0)} KG</p>
        <p>Total fuel {data.total_fuel.toFixed(0)} KG</p>
        <p>Payload Weight {data.payload.toFixed(0)} KG</p>
        <p>Total Weight {data.total.toFixed(0)} KG</p>
        
      </div>
    )
  } else {
    return <h1>Loading...</h1>
  }
  
}
export default Weights;