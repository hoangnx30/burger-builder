import * as actionTypes from "../action/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.tokenId,
        userId: action.payload.userId,
        error: null,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error.response.data.error,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
      };
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
