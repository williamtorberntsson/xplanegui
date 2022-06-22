import React from "react";

import {FiNeedleSmall, FiNeedle, AltitudeMeterBlack, AltitudeMeterWhite } from "../images";

const Altimeter = (props) => {
  let needle = 90 + ((props.altitude % 1000) * 360) / 1000;
  let needleSmall = (props.altitude / 10000) * 360;
  let pressure = 2 * props.pressure - 1980;

  return (
    <span id="altimeter">
      <div className="instrument altimeter" style={{ height: "200px", width: "200px" }}>
        <img src={AltitudeMeterBlack} className="box" />
        <div className="needleSmall box" style={{ transform: `rotate(${needleSmall}deg)` }}>
          <img src={FiNeedleSmall} className="box" />
        </div>
        <div className="needle box" style={{ transform: `rotate(${needle}deg)` }}>
          <img src={FiNeedle} className="box" />
        </div>
      </div>
    </span>
  );
};

export default Altimeter;
