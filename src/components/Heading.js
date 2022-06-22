import React from "react";
import { FiBox, FiCircle, HeadingYaw, HeadingMechanics } from "../images";

const Heading = (props) => {
  let heading = props.heading;

  return (
    <span id="heading">
      <div className="instrument heading" style={{ height: "200px", width: "200px" }}>
        <img src={FiBox} className="background box" style={{ display: props.showBox ? "" : "none" }}/>
        <div className="heading box" style={{ transform: `rotate(-${heading}deg)` }}>
          <img src={HeadingYaw} className="box" />
        </div>
        <div className="mechanics box">
          <img src={HeadingMechanics} className="box" />
          <img src={FiCircle} className="box" />
        </div>
      </div>
    </span>
  );
};
export default Heading;
