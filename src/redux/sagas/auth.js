import axios from "axios";
import { put, delay } from "redux-saga/effects";
import {
  authFail,
  authStart,
  authSuccess,
  checkTokenTimeOut,
  logout,
} from "../action/auth.action";

export function* logoutSaga(action) {
  yield localStorage.clear();
}
export function* checkAuthTimeOutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(logout());
}

export function* authCheckStateSaga(action) {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  if (!token) {
    yield put(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate > new Date()) {
      yield put(authSuccess({ idToken: token, localId: userId }));
      yield put(
        checkTokenTimeOut(
          Math.floor((expirationDate.getTime() - new Date().getTime()) / 1000)
        )
      );
    } else {
      yield put(logout());
    }
  }
}

export function* authUser(action) {
  const { isSignup, email, password } = action;
  let URL =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbVBsguM4VksJhiGZBdfI1a0qEd3LQgu4";
  if (!isSignup) {
    URL =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbVBsguM4VksJhiGZBdfI1a0qEd3LQgu4";
  }

  yield put(authStart());
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  try {
    const response = yield axios({
      url: URL,
      method: "POST",
      data: authData,
    });
    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(authSuccess(response.data));
    yield put(checkTokenTimeOut(Number(response.data.expiresIn)));
  } catch (error) {
    yield put(authFail(error));
  }
}
