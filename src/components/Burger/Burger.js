import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import "./Burger.css";

const burger = props => {
  const transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientKey => {
      return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
        return (
          <BurgerIngredient key={`${ingredientKey}${i}`} type={ingredientKey} />
        );
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformedIngredients.length > 0 ? (
        transformedIngredients
      ) : (
        <p>Please start adding ingredients!</p>
      )}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
