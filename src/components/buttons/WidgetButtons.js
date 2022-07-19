/**
 * Widget selection buttons for WAD (bottom)
 * @component
 * @category Buttons
 * @param {string} activeWidget name of recently pressed widget 
 * @returns array of buttons
 */
const WidgetButtons = ({ activeWidget }) => {

  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '30vw', paddingBottom: '1.5vh' }}>
      <button className="button-30" onClick={() => { activeWidget('pfd') }} role="button">PFD</button>
      <button className="button-30" onClick={() => { activeWidget('weights') }} role="button">Weights</button>
      <button className="button-30" onClick={() => { activeWidget('warnings') }} role="button">Warnings</button>
      <button className="button-30" onClick={() => { activeWidget('none') }} role="button">None</button>
    </div>
  )
};

export default WidgetButtons;