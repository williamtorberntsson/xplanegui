
/**
 * The buttons for WAD
 * @component
 * @param {function} props.Usize function to set size for upper widget
 * @param {function} props.Bsize function to set size for bottom widget
 * @param {function} props.activeWidget function to set the active widget
 * @returns button layout for WAD
 */
const BoxButtons = (props) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '1.5vw', height: '87vh' }}>
      <button className="button-40" onClick={() => { props.Usize('s') }} role="button"></button>
      <button className="button-40" onClick={() => { props.Usize('m') }} role="button"></button>
      <button className="button-40" onClick={() => { props.Usize('L'); props.Bsize('L') }} role="button"></button>
      <button className="button-40" onClick={() => { props.Bsize('m') }} role="button"></button>
      <button className="button-40" onClick={() => { props.Bsize('s') }} role="button"></button>
    </div>
  )
};


const WidgetButtons = (props) => {

  const handleClick = (widgetName) => props.activeWidget(widgetName);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '30vw', paddingBottom: '1.5vh' }}>
      <button className="button-30" onClick={() => { handleClick('pfd') }} role="button">PFD</button>
      <button className="button-30" onClick={() => { handleClick('weights') }} role="button">Weights</button>
      <button className="button-30" onClick={() => { handleClick('warnings') }} role="button">Warnings</button>
      <button className="button-30" onClick={() => { handleClick('None') }} role="button">None</button>
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