/**
 * The left/right side buttons on WAD to select widget size
 * @see WAD
 * @component
 * @category Buttons
 * @param {function} props.Usize function to set size for upper widget
 * @param {function} props.Bsize function to set size for bottom widget
 * @param {function} props.activeWidget function to set the active widget
 * @returns array of buttons
 */
const BoxButtons = ({ Usize, Bsize, selectedPos, side }) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '1.5vw', height: '87vh' }}>
      <button className="button-40" onClick={() => { Usize('S'); selectedPos("U" + side) }} role="button"></button>
      <button className="button-40" onClick={() => { Usize('M'); selectedPos("U" + side) }} role="button"></button>
      <button className="button-40" onClick={() => { Usize('L'); Bsize('L'); selectedPos("M" + side) }} role="button"></button>
      <button className="button-40" onClick={() => { Bsize('M'); selectedPos("B" + side) }} role="button"></button>
      <button className="button-40" onClick={() => { Bsize('S'); selectedPos("B" + side) }} role="button"></button>
    </div>
  )
};

export default BoxButtons;