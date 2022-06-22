import React from "react";
import { useState, useEffect } from "react";
import "./PFD.css"
import AirSpeed from "./AirSpeed";
import Altimeter from "./Altimeter";
import Attitude from "./Attitude";
import Heading from "./Heading";

const PFD = (props) => {

  const [altitude, setAltitude] = useState(0)
  const [roll, setRoll] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoll(roll + 1);
      setPitch(pitch + 1);
      setAltitude((altitude + 5));
      setSpeed((altitude + 1) % 900);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="pfd">
      <div className="mouseears">
        <AirSpeed speed={speed} lightTheme={props.lightTheme} />
        <Altimeter altitude={altitude} pressure={5} lightTheme={props.lightTheme}/>
      </div>
      <div className="mousehead">
        <Attitude roll={0} pitch={0} />
        <Heading heading={45} />
      </div>

      {/*<Variometer verticalSpeed={5} />*/}
    </div>
  );
}

export default PFD;