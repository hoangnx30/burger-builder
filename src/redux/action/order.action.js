import axiosInstance from "../../axios-order";

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
  return (dispatch) => {
    axiosInstance
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
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

const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};

export const fetchOrderStartAsync = (token, userId) => {
  return (dispatch) => {
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"&print=pretty`;
    dispatch(fetchOrderStart());
    axiosInstance
      .get("/orders.json" + queryParams)
      .then((response) => {
        const orders = [];
        for (const key in response.data) {
          orders.push({ ...response.data[key], id: key });
        }
        dispatch(fetchOrderSuccess(orders));
      })
      .catch((error) => dispatch(fetchOrderFail()));
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
