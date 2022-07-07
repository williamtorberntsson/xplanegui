import React, { useEffect, useState } from "react";
import PFD from "./widgets/pfd/PFD";
import Weights from "./widgets/statuswidgets/Weights";
import Warnings from "./widgets/statuswidgets/Warnings";
import Status from "./widgets/statuswidgets/Status";
import { useXplaneData } from "./constants";
import UpdateOfflineData from "./map/UpdateOfflineData";
import { pfd_init_data } from "./constants";

const WidgetSelector = ({ widget, size }) => {

  const [data, setData] = useState();

  useEffect(() => {
    if (widget) {
      fetch(`/${widget}`).then(
        res => res.json()
      ).then(
        data => {
          setData(data)
        }
      )
    } else { // use offline data
      const interval = setInterval(() => {
        UpdateOfflineData(data, setData); // change data with Offline
      }, 20); // update 20 times/s

      return () => clearInterval(interval); // Unmount function to prevent memory leaks.
    }
  })

  switch (widget) {
    case "pfd": return <PFD size={size} data={data ? data : pfd_init_data} />
    case "weights": return <Weights size={size} data={data} />
    case "warnings": return <Warnings size={size} data={data} />
    case "status": return <Status size={size} data={data} />
    default: return <div>No valid widget chosen</div>
  }
}
export default WidgetSelector;