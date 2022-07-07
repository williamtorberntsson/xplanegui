import React from "react";

/**
 * A widget that shows weights for airplane
 * @component
 * @param {string} size size of widget
 * @param {dictionary} data data for widget
 * @todo add support for multiple sizes
 * @todo add more/other info  
 * @returns widget that show weights for airplane 
 */
const Weights = ({size, data}) => {

  if(data) {
    console.log(data)
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