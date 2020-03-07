import * as actionTypes from "../action/actionTypes";

const initailState = {
  orders: [],
  isLoading: false,
  purchased: false,
  isFetching: true
};

const reducer = (state = initailState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.payload.orderData,
        id: action.payload.id
      };
      return {
        ...state,
        isLoading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        isLoading: false
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.FETCH_ORDER_START:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.payload.data,
        isFetching: false
      };
    case actionTypes.FETCH_ORDER_FAIL:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default reducer;
