import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends React.Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      ingredientKey => {
        return (
          <li key={ingredientKey}>
            <span style={{ textTransform: "capitalize" }}>{ingredientKey}</span>
            : {this.props.ingredients[ingredientKey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burgur with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total price: {this.props.price.toFixed(2)}$</strong>
        </p>
        <p>Continue to checkout</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
