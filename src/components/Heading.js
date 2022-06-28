import React from "react";
import { HeadingYaw, HeadingMechanics, HorizonBack, HorizonBall, HorizonCircle, HorizonMechanics } from "../images";

const Heading = (props) => {
  const heading = props.heading;

  return (
    <div className="instrument heading" style={{ height: "200px", width: "200px" }}>
      <div className="heading box" style={{ transform: `rotate(${heading}deg)` }}>
        <img src={HeadingYaw} className="box"/>
      </div>
      <div className="mechanics box">
        <img src={HeadingMechanics} className="box" />
      </div>
    </div>
  );
};
export default Heading;
