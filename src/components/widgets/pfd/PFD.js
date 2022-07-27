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

  // if (!useXplaneData) data = pfd_init_data;

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
            <Alpha alpha={data.alpha} />
            <G ax={data.g_side} ay={data.g_axil} az={data.g_nrml} />
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
      <div className={styles.S}>
        <Attitude roll={data.roll} pitch={data.pitch}/>
        <AirSpeed speed={data.true_airspeed}/>
        <Altimeter altitude={data.altitude}/>
      </div>
    )
  }
  else if (size === "L") {
    return (
      <div className={styles.L}>
        <Attitude roll={data.roll} pitch={data.pitch} width={'20vh'} height={'20vh'} />

        <Altimeter altitude={data.altitude} width={'20vh'} height={'20vh'} />

        <AirSpeed speed={data.true_airspeed} width={'20vh'} height={'20vh'} />

        <Heading heading={data.true_heading} />
        <Alpha alpha={5} />
        <G ax={1} ay={1} az={0.5} />
      </div>
    )
  }
}

export default PFD;