import styles from "../../styles/Alpha.module.css";

/**
 * A widget that displays the current angle of attack (AOT)
 * @component
 * @category Widget
 * @subcategory PFD
 * @prop {float} alpha alpha (AOT angle) 
 * @returns alpha widget
 */
const Alpha = ({ alpha }) => {
  return (
    <div className={styles.alpha}>
      <span>&alpha; {Math.abs(alpha).toFixed(1)}</span>
    </div>
  )
}
export default Alpha;