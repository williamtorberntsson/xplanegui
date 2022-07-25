import styles from "../../styles/PFD.module.css"
import AirSpeed from "./AirSpeed";
import Altimeter from "./Altimeter";
import Attitude from "./Attitude";
import Heading from "./Heading";
import Alpha from "./Alpha";
import G from "./G";
import { useXplaneData, pfd_init_data } from "../../../constants";

/**
 * Creates a PFD (primary flight display) with the help of smaller instruments
 * @component
 * @category Widget
 * @subcategory PFD
 * @prop {dictinary} data data for widget
 * @prop {string} size size for widget
 * @returns pfd
 */
const PFD = ({ data, size }) => {

  if (!useXplaneData) data = pfd_init_data;

  // Medium size widget
  if (size === "M") {
    return (
      <div className={styles.pfd}>
        <div className={styles.mouseears}>
          <AirSpeed speed={data.true_airspeed} />
          <Altimeter altitude={data.altitude} />
        </div>
        <div className={styles.mousehead}>
          <div className={styles.side_values}>
            <Alpha alpha={5} />
            <G ax={1} ay={1} az={0.5} />
          </div>
          <div className={styles.heading_attitude}>
            <Attitude roll={data.roll} pitch={data.pitch} />
            <Heading heading={data.true_heading} />
          </div>
        </div>
      </div>
    );
  } else if (size === "S") { // small size widget
    return (
      <div className={styles.mouseears}>
        <Attitude roll={data.roll} pitch={data.pitch} />
        <Altimeter altitude={data.altitude} />
      </div>
    )
  }
  else if (size === "L") {
    return (
    <div className={styles.expanded}>
      <Attitude roll={data.roll} pitch={data.pitch} />
      <br></br>
      <Altimeter altitude={data.altitude}/>
      <br></br>
      <AirSpeed speed={data.true_airspeed} />
      <br></br>
      <Heading heading={data.true_heading} />
      <br></br>
      <Alpha alpha={5} />
      <br></br>
      <G ax={1} ay={1} az={0.5} />
    </div>
    )
  }
}

export default PFD;