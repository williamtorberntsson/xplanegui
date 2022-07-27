import { useState } from "react";
/**
 * Widget selection buttons for WAD (bottom)
 * @component
 * @category Buttons
 * @param {string} activeWidget name of recently pressed widget 
 * @returns array of buttons
 */
const WidgetButtons = ({ update, activeBtn, selecter, reset }) => {

  function updateAll(widget) {
    update(widget)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', flex: 1, paddingBottom: '1.5em' }}>
      <button className={`button-30 ${selecter === 'reset_left' ? 'border' : ""}`} role="button" onClick={() => { reset('left') }}>Reset Left side</button>

      <div>
        <button className={`button-30 ${activeBtn === 'pfd' ? 'active' : ''} ${selecter === 'pfd' ? 'border' : ""}`} onClick={() => { updateAll('pfd') }} role="button">PFD</button>
        <button className={`button-30 ${activeBtn === 'weights' ? 'active' : ''} ${selecter === 'weights' ? 'border' : ""}`} onClick={() => { updateAll('weights') }} role="button">Weights</button>
        <button className={`button-30 ${activeBtn === 'warnings' ? 'active' : ''} ${selecter === 'warnings' ? 'border' : ""}`} onClick={() => { updateAll('warnings') }} role="button">Warnings</button>
        <button className={`button-30 ${activeBtn === 'none' ? 'active' : ''} ${selecter === 'none' ? 'border' : ""}`} onClick={() => { updateAll('none'); }} role="button">None</button>
      </div>

      <button className={`button-30 ${selecter === 'reset_right' ? 'border' : ""}`} role="button" onClick={() => { reset('right') }}>Reset Right side</button>
    </div>
  )
};

export default WidgetButtons;