import React, { useEffect, useState } from "react";
import PFD from "./widgets/pfd/PFD";
import Weights from "./widgets/statuswidgets/Weights";
import Warnings from "./widgets/statuswidgets/Warnings";
import Status from "./widgets/statuswidgets/Status";

/**
 * Component for returning widget from a name and giving the widget the right data
 * @component
 * @category Widget
 * @prop {string} widget widget name
 * @prop {size} size size of widget
 * @returns widget
 */
const WidgetSelector = ({ widget, size, data }) => {

  switch (widget) {
    case "pfd": return <PFD size={size} data={data.pfd} />
    case "weights": return <Weights size={size} data={data.weights} />
    case "warnings": return <Warnings size={size} data={data} />
    case "status": return <Status size={size} data={data} />
    case "none": return <div></div>
    default: return <div></div>
  }
}
export default WidgetSelector;