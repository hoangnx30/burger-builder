import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../action/actionTypes";
import {
  logoutSaga,
  checkAuthTimeOutSaga,
  authCheckStateSaga,
  authUser,
} from "./auth";
import { initIngredientSaga } from "./burgerBuilder";
import { fetchOrderSaga, purchaseBurger } from "./order";

export function* watch() {
  yield takeEvery(actionTypes.AUTH_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeOutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUser);

  yield takeEvery(actionTypes.FETCH_INGREDIENTS, initIngredientSaga);

  yield takeEvery(actionTypes.FETCH_ORDER, fetchOrderSaga);
  yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurger);
}
