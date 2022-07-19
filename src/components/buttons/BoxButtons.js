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
const BoxButtons = ({ activeArea, Usize, Bsize, side }) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '1.5vw', height: '87vh' }}>
      <button className="button-40" onClick={() => { Usize('S'); activeArea("U" + side) }} role="button"></button>
      <button className="button-40" onClick={() => { Usize('M'); activeArea("U" + side) }} role="button"></button>
      <button className="button-40" onClick={() => { Usize('L'); Bsize('L'); activeArea("M" + side) }} role="button"></button>
      <button className="button-40" onClick={() => { Bsize('M'); activeArea("B" + side) }} role="button"></button>
      <button className="button-40" onClick={() => { Bsize('S'); activeArea("B" + side) }} role="button"></button>
    </div>
  )
};

export default BoxButtons;