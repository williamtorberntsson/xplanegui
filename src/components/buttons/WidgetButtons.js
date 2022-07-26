/**
 * Widget selection buttons for WAD (bottom)
 * @component
 * @category Buttons
 * @param {string} activeWidget name of recently pressed widget 
 * @returns array of buttons
 */
const WidgetButtons = ({ update }) => {

  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '40vw', paddingBottom: '1.5em', paddingLeft: '20em', paddingRight: '16.3em'  }}>
      <button className="button-30" onClick={() => { update('pfd') }} role="button">PFD</button>
      <button className="button-30" onClick={() => { update('weights') }} role="button">Weights</button>
      <button className="button-30" onClick={() => { update('warnings') }} role="button">Warnings</button>
      <button className="button-30" onClick={() => { update('none') }} role="button">None</button>
    </div>
  )
};

export default WidgetButtons;