
/**
 * The left/right side buttons on WAD to select widget size
 * @see WAD
 * @component
 * @category Buttons
 * @param {function} Usize function to set size for upper widget
 * @param {function} Bsize function to set size for bottom widget
 * @param {function} selectedPos function to set the active position
 * @param {string} side L/R which side of screen
 * @param {boolean} active if buttons active or not
 * @returns array of buttons
 */
const BoxButtons = ({ Usize, Bsize, selectedPos, side, arrow, activeBtn, btnUpdate, selecter }) => {

  if (side === "L") {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '1.5vw', height: '87vh' }}>
        <button id='1' className={`button-40 ${activeBtn === '1' ? 'active' : ''} ${selecter === '1' ? 'border' : ''}`} onClick={() => { Usize('S'); selectedPos("U" + side); btnUpdate('1') }} role="button"></button>
        <button id='2' className={`button-40 ${activeBtn === '2' ? 'active' : ''} ${selecter === '2' ? 'border' : ''}`} onClick={() => { Usize('M'); selectedPos("U" + side); btnUpdate('2') }} role="button"></button>
        <button id='3' className={`button-40 ${activeBtn === '3' ? 'active' : ''} ${selecter === '3' ? 'border' : ''}`} onClick={() => { Usize('L'); Bsize('L'); selectedPos("M" + side); btnUpdate('3') }} role="button">{arrow}</button>
        <button id='4' className={`button-40 ${activeBtn === '4' ? 'active' : ''} ${selecter === '4' ? 'border' : ''}`} onClick={() => { Bsize('M'); selectedPos("B" + side); btnUpdate('4') }} role="button"></button>
        <button id='5' className={`button-40 ${activeBtn === '5' ? 'active' : ''} ${selecter === '5' ? 'border' : ''}`} onClick={() => { Bsize('S'); selectedPos("B" + side); btnUpdate('5') }} role="button"></button>
      </div>
    )
  } else if (side === "R") {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '1.5vw', height: '87vh' }}>
        <button id='6' className={`button-40 ${activeBtn === '6' ? 'active' : ''} ${selecter === '6' ? 'border' : ''}`} onClick={() => { Usize('S'); selectedPos("U" + side); btnUpdate('6') }} role="button"></button>
        <button id='7' className={`button-40 ${activeBtn === '7' ? 'active' : ''} ${selecter === '7' ? 'border' : ''}`} onClick={() => { Usize('M'); selectedPos("U" + side); btnUpdate('7') }} role="button"></button>
        <button id='8' className={`button-40 ${activeBtn === '8' ? 'active' : ''} ${selecter === '8' ? 'border' : ''}`} onClick={() => { Usize('L'); Bsize('L'); selectedPos("M" + side); btnUpdate('8') }} role="button">{arrow}</button>
        <button id='9' className={`button-40 ${activeBtn === '9' ? 'active' : ''} ${selecter === '9' ? 'border' : ''}`} onClick={() => { Bsize('M'); selectedPos("B" + side); btnUpdate('9') }} role="button"></button>
        <button id='10' className={`button-40 ${activeBtn === '10' ? 'active' : ''} ${selecter === '10' ? 'border' : ''}`} onClick={() => { Bsize('S'); selectedPos("B" + side); btnUpdate('10') }} role="button"></button>
      </div>
    )
  }
};

export default BoxButtons;