import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      tokenId: authData.idToken,
      userId: authData.localId,
    },
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: { error: error },
  };
};

export const authAsync = (email, password, isSignup) => {
  let URL =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbVBsguM4VksJhiGZBdfI1a0qEd3LQgu4";
  if (!isSignup) {
    URL =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbVBsguM4VksJhiGZBdfI1a0qEd3LQgu4";
  }
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    axios({
      url: URL,
      method: "POST",
      data: authData,
    })
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data));
        dispatch(checkTokenTimeOut(Number(response.data.expiresIn)));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

export const checkTokenTimeOut = (expiresIn) => {
  console.log(expiresIn);
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expiresIn * 1000);
  };
};

export const logout = () => {
  localStorage.clear();
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        console.log(expirationDate.getSeconds());
        console.log(new Date());
        dispatch(authSuccess({ idToken: token, localId: userId }));
        dispatch(
          checkTokenTimeOut(
            Math.floor((expirationDate.getTime() - new Date().getTime()) / 1000)
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
