import axiosInstance from "../../axios-order";

import * as actionTypes from "./actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    payload: {
      id: id,
      orderData: orderData
    }
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    payload: {
      error: error
    }
  };
};

export const purchaseBurgerSuccessAsync = orderData => {
  return dispatch => {
    axiosInstance
      .post("/orders.json", orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

const fetchOrderStart = data => {
  return {
    type: actionTypes.FETCH_ORDER_START
  };
};

export const fetchOrderStartAsync = () => {
  return dispatch => {
    axiosInstance.get("/orders.json").then(response => {
      const orders = [];
      for (const key in response.data) {
        orders.push({ ...response.data[key], id: key });
      }
      dispatch(fetchOrderSuccess(orders));
    });
  };
};

export const fetchOrderSuccess = data => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    payload: {
      data: data
    }
  };
};

export const fetchOrderFail = () => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL
  };
};
