import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import "./BuildControls.css";

const controls = [
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
  { label: "Salad", type: "salad" },
];

const BuildControls = (props) => {
  return (
    <div className="BuildControls">
      <p>
        Current price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((control) => {
        return (
          <BuildControl
            key={control.label}
            label={control.label}
            added={() => props.ingredientAdded(control.type)}
            removed={() => props.ingredientRemoved(control.type)}
            disabled={props.disabled[control.type]}
          />
        );
      })}
      <button
        className="orderButton"
        disabled={props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuthenticated ? "ORDER NOW" : "Sign up to order"}
      </button>
    </div>
  );
};

export default BuildControls;
