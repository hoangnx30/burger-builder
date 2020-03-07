import React from "react";
import "./BuildControl.css";

const BuildControl = props => {
  return (
    <div className="BuildControl">
      <button
        className="Less"
        onClick={props.removed}
        disabled={props.disabled}
      >
        Less
      </button>
      <div className="Label">{props.label}</div>
      <button className="More" onClick={props.added}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
