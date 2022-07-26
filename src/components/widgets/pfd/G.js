import styles from "../../styles/G.module.css";

/**
 * A widget that shows the current total acceleration (g-forces).
 * This is how XPlane does calculations of g-forces with negative values included.
 * XPlane only takes the biggest value of the three axes.
 * @component
 * @category Widget
 * @subcategory PFD
 * @prop {float} ax acceleration for x-axis
 * @prop {float} ay acceleration for y-axis
 * @prop {float} az acceleration for z-axis
 * @returns alpha widget
 */
const G = ({ ax, ay, az }) => {

  let G = Math.abs(ax)

  if(Math.abs(ay) > Math.abs(ax) && Math.abs(ay) > Math.abs(az)) G = Math.abs(ay) // y-axis biggest
  else if(Math.abs(az) > Math.abs(ax) && Math.abs(az) > Math.abs(ay)) G = az // z-axis biggest



  return (
    <div className={styles.g}>
      <span>G: </span>
      <span>{G.toFixed(1)}</span>
    </div>
  )
}
export default G;