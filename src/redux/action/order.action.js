import * as actionTypes from "./actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    payload: {
      id: id,
      orderData: orderData,
    },
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    payload: {
      error: error,
    },
  };
};

export const purchaseBurgerSuccessAsync = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER,
    orderData,
    token,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};

export const fetchOrderStartAsync = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDER,
    token,
    userId,
  };
};

export const fetchOrderSuccess = (data) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    payload: {
      data: data,
    },
  };
};

export const fetchOrderFail = () => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
  };
};
