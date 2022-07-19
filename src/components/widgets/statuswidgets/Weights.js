import React from "react";
import { useXplaneData, weights_init_data } from "../../constants";

/**
 * A widget that shows weights for airplane
 * @component
 * @prop {string} size size of widget
 * @prop {dictionary} data data for widget
 * @todo add support for multiple sizes
 * @todo add more/other info  
 * @returns airplane weights widget
 */
const Weights = ({ size, data }) => {

  if (!useXplaneData) data = weights_init_data;

  return (
    <div>
      <p>Fuel 1: {data.fuel1.toFixed(0)} KG</p>
      <p>Fuel 2: {data.fuel2.toFixed(0)} KG</p>
      <p>Total fuel: {data.total_fuel.toFixed(0)} KG</p>
      <p>Payload Weight: {data.payload.toFixed(0)} KG</p>
      <p>Total Weight: {data.total.toFixed(0)} KG</p>
    </div>
  )

}
export default Weights;