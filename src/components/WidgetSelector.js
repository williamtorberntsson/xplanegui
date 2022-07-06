import React from "react";
import PFD from "./PFD";
import Weights from "./AirPlaneStatus/Weights";
import Warnings from "./AirPlaneStatus/Warnings";
import Status from "./AirPlaneStatus/Status";

const WidgetSelector = ({ widget, size, data }) => {

  switch (widget) {
    case "PFD": return <PFD size={size} data={data.useXplaneData ? data.myAirPlaneData : data.offlineData} />
    case "PlaneStatus": return <Weights size={size} data={data} />
    case "Warnings": return <Warnings size={size} data={data} />
    case "Status": return <Status size={size} data={data} />
    default: return <div>No valid widget chosen</div>
  }
}
export default WidgetSelector;