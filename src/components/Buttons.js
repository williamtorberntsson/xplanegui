
/**
 * The buttons for WAD
 * @component
 * @param {function} props.Usize function to set size for upper widget
 * @param {function} props.Bsize function to set size for bottom widget
 * @param {function} props.activeWidget function to set the active widget
 * @returns button layout for WAD
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

const ExtendableButtons = () => {

  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100vw', paddingTop: '1.3vh' }}>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
      <button className="button-30" role="button">   </button>
    </div>
  )
};

export { BoxButtons, WidgetButtons, ExtendableButtons };