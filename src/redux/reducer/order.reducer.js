import * as actionTypes from "../action/actionTypes";
import { updateObject } from "../../utility";

const initailState = {
  orders: [],
  isLoading: false,
  purchased: false,
  isFetching: true,
};

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.payload.orderData,
    id: action.payload.id,
  };
  return updateObject(state, {
    isLoading: false,
    orders: state.orders.concat(newOrder),
    purchased: true,
  });
};

const purchaseBurgerFail = (state, action) => {
  return updateObject(state, { isLoading: false });
};

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { isLoading: true });
};

const fetchingOrderStart = (state, action) => {
  return updateObject(state, { isFetching: true });
};

const fetchOrderSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.payload.data,
    isFetching: false,
    isLoading: false
  });
};

const fetchOrderFail = (state, action) => {
  return updateObject(state, { isFetching: false });
};

const reducer = (state = initailState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case actionTypes.FETCH_ORDER_START:
      return fetchingOrderStart(state, action);
    case actionTypes.FETCH_ORDER_SUCCESS:
      return fetchOrderSuccess(state, action);
    case actionTypes.FETCH_ORDER_FAIL:
      return fetchOrderFail(state, action);
    default:
      return state;
  }
};

export default reducer;
