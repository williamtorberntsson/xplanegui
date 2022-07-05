import React from "react";
import { Compass } from "../images";
import "./Heading.css"

const NewHeading = (props) => {
  const heading = props.heading;

  const calc_heading = heading * 86.3 / 360 + 6.9; // fit heading to svg

  return (
    <div className="compass_mask">
      <div className="compass_value_border">
        <p className="compass_value">{calc_heading.toFixed(0)}</p>
      </div>
      <img className="compass" style={{ objectPosition: `${calc_heading}% 0` }} src={Compass} />
    </div>
  );
};
export default NewHeading;
