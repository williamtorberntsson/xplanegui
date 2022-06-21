import React from "react";
import { useState, useEffect } from "react";
import "./PFD.css"
import AirSpeed from "./AirSpeed";
import Altimeter from "./Altimeter";

const PFD = () => {

  const [altitude, setAltitude] = useState(0)
  const [roll, setRoll] = useState(0);
  const [pitch, setPitch] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoll(roll + 1);
      setPitch(pitch + 1);
      setAltitude((altitude + 1) % 360)
    }, 100);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="pfd">
      <div className="mouseears">
        <AirSpeed speed={altitude} />
        <Altimeter altitude={altitude} pressure={5}/>
      </div>
      <div className="mousehead">
        {/*<Attitude roll={10} pitch={10} />*/}
      </div>

      {/*<Heading heading={45} />
      <Variometer verticalSpeed={5} />
      */}
    </div>
  );
}

export default PFD;