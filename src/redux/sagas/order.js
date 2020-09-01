import { put } from "redux-saga/effects";
import {
  fetchOrderStart,
  fetchOrderSuccess,
  fetchOrderFail,
  purchaseBurgerSuccess,
  purchaseBurgerFail
} from "../action/order.action";
import axiosInstance from "../../axios-order";

export function* fetchOrderSaga(action) {
  const { token, userId } = action;
  const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"&print=pretty`;
  yield put(fetchOrderStart());
  try {
    const response = yield axiosInstance.get("/orders.json" + queryParams);
    const orders = [];
    for (const key in response.data) {
      orders.push({ ...response.data[key], id: key });
    }
    yield put(fetchOrderSuccess(orders));
  } catch (error) {
    yield fetchOrderFail();
  }
}

export function* purchaseBurger(action) {
  const { orderData, token } = action;
  try {
    const response = yield axiosInstance.post(
      "/orders.json?auth=" + token,
      orderData
    );
    yield put(purchaseBurgerSuccess(response.data, orderData))
  } catch (error) {
    yield put(purchaseBurgerFail(error))
  }
}
