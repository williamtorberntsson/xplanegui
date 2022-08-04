import PFD from "./pfd/PFD";
import Weights from "./statuswidgets/Weights";
import Warnings from "./statuswidgets/Warnings";
import Status from "./statuswidgets/Status";
import SoundExample from "./statuswidgets/SoundExample";
import { USE_XPLANE_DATA } from "../../settings";

/**
 * Selects a widget from name, size and data
 * @component
 * @category Widget
 * @prop {string} widget widget name
 * @prop {size} size size of widget
 * @prop {dict} data dictionary containing data
 * @returns widget
 */
const WidgetSelector = ({ widget, size, data }) => {
  // let dataPFD
  // if (!USE_XPLANE_DATA || data === undefined) {
  //   dataPFD = data
  // }
  // else {
  //   dataPFD = data.pfd
  // }
  //console.log(data)

  switch (widget) {
    case "pfd": return <PFD size={size} data={data.pfd} />
    case "weights": return <Weights size={size} data={data.weights} />
    case "warnings": return <Warnings size={size} data={data.warnings} />
    case "status": return <Status size={size} data={data.status} />
    case "sound_example": return <SoundExample />
    case "none": return <div></div>
    default: return <div></div>
  }
}
export default WidgetSelector;