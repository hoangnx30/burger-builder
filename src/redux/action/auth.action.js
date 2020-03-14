import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      tokenId: authData.idToken,
      userId: authData.localId
    }
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: { error: error }
  };
};

export const authAsync = (email, password, isSignup) => {
  let URL =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbVBsguM4VksJhiGZBdfI1a0qEd3LQgu4";
  if (!isSignup) {
    URL =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbVBsguM4VksJhiGZBdfI1a0qEd3LQgu4";
  }
  return dispath => {
    dispath(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    axios({
      url: URL,
      method: "POST",
      data: authData
    })
      .then(response => {
        dispath(authSuccess(response.data));
      })
      .catch(error => {
        dispath(authFail(error));
      });
  };
};

export const checkTokenTimeOut = expriresIn => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expriresIn * 1000);
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};
