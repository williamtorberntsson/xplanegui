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

  //  let active = false 
  function toggle(id) {
    var elements = document.getElementsByClassName("button-40");
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = "#9b9b9b";
    }
    document.getElementById(id).style.backgroundColor = "#8bb08f";
  }

const BoxButtonsL = ({ Usize, Bsize, selectedPos, side, arrow }) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '1.5vw', height: '87vh' }}>
      <button id='1' className="button-40" onClick={() => { Usize('S'); selectedPos("U" + side); toggle('1') }} role="button"></button>
      <button id='2' className="button-40" onClick={() => { Usize('M'); selectedPos("U" + side); toggle('2') }} role="button"></button>
      <button id='3' className="button-40" onClick={() => { Usize('L'); Bsize('L'); selectedPos("M" + side); toggle('3') }} role="button">{arrow}</button>
      <button id='4' className="button-40" onClick={() => { Bsize('M'); selectedPos("B" + side); toggle('4') }} role="button"></button>
      <button id='5' className="button-40" onClick={() => { Bsize('S'); selectedPos("B" + side); toggle('5') }} role="button"></button>
    </div>
  )
};

const BoxButtonsR = ({ Usize, Bsize, selectedPos, side, arrow }) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '1.5vw', height: '87vh' }}>
      <button id='6' className="button-40" onClick={() => { Usize('S'); selectedPos("U" + side); toggle('6') }} role="button"></button>
      <button id='7' className="button-40" onClick={() => { Usize('M'); selectedPos("U" + side); toggle('7') }} role="button"></button>
      <button id='8' className="button-40" onClick={() => { Usize('L'); Bsize('L'); selectedPos("M" + side); toggle('8') }} role="button">{arrow}</button>
      <button id='9' className="button-40" onClick={() => { Bsize('M'); selectedPos("B" + side); toggle('9') }} role="button"></button>
      <button id='10' className="button-40" onClick={() => { Bsize('S'); selectedPos("B" + side); toggle('10') }} role="button"></button>
    </div>
  )
};

export {BoxButtonsL, BoxButtonsR};