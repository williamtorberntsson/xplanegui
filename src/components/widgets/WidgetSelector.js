import PFD from "./pfd/PFD";
import Weights from "./statuswidgets/Weights";
import WarningsSound from "./statuswidgets/WarningsSound";
import Status from "./statuswidgets/Status";
import Time from "./statuswidgets/Time";

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

  switch (widget) {
    case "pfd": return <PFD size={size} data={data.pfd} />
    case "weights": return <Weights size={size} data={data.weights} />
    case "warnings": return <WarningsSound size={size} data={data.warnings} />
    case "status": return <Status size={size} data={data.status} />
    case "time": return <Time />
    case "none": return <div></div>
    default: return <div></div>
  }
}
export default WidgetSelector;