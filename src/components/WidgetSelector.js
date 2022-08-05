import PFD from "./widgets/pfd/PFD";
import Weights from "./widgets/statuswidgets/Weights";
import Warnings from "./widgets/statuswidgets/Warnings";
import Status from "./widgets/statuswidgets/Status";
import { USE_XPLANE_DATA } from "../settings";

/**
 * Component for returning widget from a name and giving the widget the right data
 * @component
 * @category Widget
 * @prop {string} widget widget name
 * @prop {size} size size of widget
 * @prop {dict} data dictionary containing data
 * @prop {boolean} USE_XPLANE_DATA bool is false when offline data should be used
 * @returns widget
 */
const WidgetSelector = ({ widget, size, data }) => {
  let dataPFD
  if (!USE_XPLANE_DATA || data == undefined) {
    dataPFD = data
  }
  else {
    dataPFD = data.pfd
  }

  switch (widget) {
    case "pfd": return <PFD size={size} data={dataPFD} />
    case "weights": return <Weights size={size} data={data.weights} />
    case "warnings": return <Warnings size={size} data={data} />
    case "status": return <Status size={size} data={data} />
    case "none": return <div></div>
    default: return <div></div>
  }
}
export default WidgetSelector;