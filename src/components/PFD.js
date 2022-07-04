import React from "react";
import { useState, useEffect } from "react";
import "./PFD.css"
import AirSpeed from "./AirSpeed";
import Altimeter from "./Altimeter";
import Attitude from "./Attitude";
import Heading from "./Heading";

const PFD = ({lightTheme, useXplaneData, data}) => {

  const [altitude, setAltitude] = useState(0)
  const [roll, setRoll] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [heading, setHeading] = useState(0);


  // Offline data: change values
  useEffect(() => {
    if(!useXplaneData) {
    const interval = setInterval(() => {
      setRoll(roll);
      setPitch((pitch + 0.1) % 90);
      setAltitude((altitude + 1));
      setSpeed((altitude + 0.1) % 463);
      setHeading((heading + 0.1) % 360);
    }, 20);

    return () => {
      clearInterval(interval);
    };
  }
  });

  return (
    <div className="pfd">
      <div style={{textAlign: "center"}}>
        PFD
      </div>
      <div className="mouseears">
        <AirSpeed speed={data ? data.true_airspeed : speed} lightTheme={lightTheme} />
        <Altimeter altitude={data ? data.altitude : altitude} pressure={5} lightTheme={lightTheme} />
      </div>
      <div className="mousehead">
        <Attitude roll={data ? data.roll : roll} pitch={data ? data.pitch : pitch} />
        <Heading heading={data ? data.heading : heading}/>
      </div>

      {/*<Variometer verticalSpeed={5} />*/}
    </div>
  );
}

export default PFD;