import React from "react";
import { connect } from "react-redux";
import axiosInstance from "../axios-order";

import Burger from "../components/Burger/Burger";
import Aux from "../hoc/Aux";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal/Modal";
import OrderSummay from "../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../components/UI/Spinner/Spinner";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderAction from "../redux/action/burgerBuilder.action";
import * as orderAction from "../redux/action/order.action";

export class BurgerBuilder extends React.Component {
  state = {
    purchasable: true,
    purchasing: false,
  };

  componentDidMount() {
    this.props.onSetIngredients();
  }

  updatepurchaseState = (totalPrice) => {
    return totalPrice && +totalPrice.toFixed(2) - 4.0 === 0;
  }

  purchasingHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push("/auth");
    }
  };


  purchaseCanceled = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onPurchaseInit();
    this.props.history.push("/check-out");
  };

  render() {
    const disableInfo = {
      ...this.props.ingredients,
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p style={{ textAlign: "center" }}>Something went wrong</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredientsHandler}
            ingredientRemoved={this.props.onRemoveIngredientHandler}
            disabled={disableInfo}
            price={this.props.totalPrice}
            purchasable={this.updatepurchaseState(this.props.totalPrice)}
            ordered={this.purchasingHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummay
          ingredients={this.props.ingredients}
          purchaseCanceled={this.purchaseCanceled}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceled}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilderState.ingredients,
    totalPrice: state.burgerBuilderState.totalPrice,
    error: state.burgerBuilderState.error,
    purchased: state.orderState.purchased,
    isAuthenticated: state.authState.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredientsHandler: (ingredientName) =>
      dispatch(burgerBuilderAction.addIngredient(ingredientName)),
    onRemoveIngredientHandler: (ingredientName) =>
      dispatch(burgerBuilderAction.removeIngredient(ingredientName)),
    onSetIngredients: () => dispatch(burgerBuilderAction.setIngredientsAsync()),
    onPurchaseInit: () => dispatch(orderAction.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosInstance));
