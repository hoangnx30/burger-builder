import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import CheckoutSummary from "../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../components/Order/ContactData/ContactData";


class Checkout extends React.Component {
  // state = {
  //   ingredients: { bacon: 0, meat: 0, salad: 0, cheese: 0 },
  //   price: 0
  // };

  // componentDidMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     if (param[0] === "price") {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, price: price });
  // }

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.push("/check-out/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCanceled={this.checkoutCanceledHandler}
            checkoutContinued={this.checkoutContinueHandler}
          />
          <Route
            path={`${this.props.match.path}/contact-data`}
            render={props => (
              <ContactData
                ingredients={this.props.ingredients}
                price={this.props.price}
                {...props}
              />
            )}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilderState.ingredients,
    price: state.burgerBuilderState.totalPrice,
    purchased: state.orderState.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
