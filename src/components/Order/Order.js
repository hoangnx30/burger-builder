import React from "react";
import classes from "./Order.module.css";

const order = props => {
  const ingredientsOutput = [];
  for (const key in props.ingredients) {
    ingredientsOutput.push({ name: key, amount: props.ingredients[key] });
  }
  const output = ingredientsOutput.map(ingredient => (
    <span
      style={{
        display: "inline-block",
        border: "1px solid #ccc",
        margin: "0 2px",
        padding: "5px",
        textTransform: "capitalize"
      }}
      key={ingredient.name}
    >
      {ingredient.name}({ingredient.amount})
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingredients: {output}</p>
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
