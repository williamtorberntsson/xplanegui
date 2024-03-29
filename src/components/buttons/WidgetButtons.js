
/**
 * Widget selection buttons for WAD (bottom)
 * Dont forgett to update WIDGET_ORDER in src/settings.js when changing button layout
 * to make sure the navigation controls works.
 * @component
 * @category Buttons
 * @param {function} update function to set name pressed widget
 * @param {string} selecter name of currently selected widget
 * @param {function} reset function to reset widget layout 
 * @returns widget buttons
 */
const WidgetButtons = ({ update, selecter, reset }) => {

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', flex: 1, paddingBottom: '1.5em' }}>
      <button className={`button-30 ${selecter === 'reset_left' ? 'border' : ""}`} role="button" onClick={() => { reset('left') }}>Reset Left side</button>

      <div>
        <button className={`button-30 ${selecter === 'pfd' ? 'border' : ""}`} onClick={() => { update('pfd') }} role="button">PFD</button>
        <button className={`button-30 ${selecter === 'weights' ? 'border' : ""}`} onClick={() => { update('weights') }} role="button">Weights</button>
        <button className={`button-30 ${selecter === 'warnings' ? 'border' : ""}`} onClick={() => { update('warnings') }} role="button">Warnings</button>
        <button className={`button-30 ${selecter === 'time' ? 'border' : ""}`} onClick={() => { update('time'); }} role="button">Time</button>
        <button className={`button-30 ${selecter === 'none' ? 'border' : ""}`} onClick={() => { update('none'); }} role="button">None</button>
      </div>

      <button className={`button-30 ${selecter === 'reset_right' ? 'border' : ""}`} role="button" onClick={() => { reset('right') }}>Reset Right side</button>
    </div>
  )
};

export default WidgetButtons;