import styles from "../../styles/PFD.module.css"
import AirSpeed from "./AirSpeed";
import Altimeter from "./Altimeter";
import Attitude from "./Attitude";
import Heading from "./Heading";
import Alpha from "./Alpha";
import G from "./G";

/**
 * Creates a PFD (primary flight display) widget with the help of smaller instruments
 * @component
 * @category Widget
 * @subcategory PFD
 * @prop {dictinary} data data for widget
 * @prop {string} size size for widget
 * @returns pfd
 */
const PFD = ({ data, size }) => {

  // Medium size widget
  if (size === "S") { // small size widget
    return (
      <div className={styles.S}>
        <AirSpeed speed={data.true_airspeed} />
        <Altimeter altitude={data.altitude} />
      </div>
    )
  } else if (size === "M") {
    return (
      <div className={styles.M}>
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
  }
  else if (size === "L") {
    return (
      <div className={styles.L}>
        <AirSpeed speed={data.true_airspeed} width={'20vh'} height={'20vh'} />

        <Attitude roll={data.roll} pitch={data.pitch} width={'20vh'} height={'20vh'} />

        <Altimeter altitude={data.altitude} width={'20vh'} height={'20vh'} />

        <Heading heading={data.true_heading} />
        <Alpha alpha={data.alpha} />
        <G ax={data.g_side} ay={data.g_axil} az={data.g_nrml} />
      </div>
    )
  }
}

export default PFD;