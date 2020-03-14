import React from "react";
import { connect } from "react-redux";

import axiosInstance from "../../axios-order";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as orderAction from "../../redux/action/order.action";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends React.Component {
  componentDidMount() {
    this.props.onFetchOrderStart(this.props.token);
  }

  render() {
    return (
      <div>
        {this.props.isFetching ? (
          <Spinner />
        ) : (
          this.props.orders.map(order => {
            return (
              <Order
                key={order.id}
                ingredients={order.ingredients}
                price={+order.price}
              />
            );
          })
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orderState.orders,
    isFetching: state.orderState.isFetching,
    token: state.authState.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrderStart: token =>
      dispatch(orderAction.fetchOrderStartAsync(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axiosInstance));
