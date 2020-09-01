import { combineReducers } from "redux";

import burgerBuilderReducer from "./burgerBuilder.reducer";
import orderReducer from "./order.reducer";
import authReducer from "./auth.reducer";

const rootReducer = combineReducers({
  burgerBuilderState: burgerBuilderReducer,
  orderState: orderReducer,
  authState: authReducer
});

export default rootReducer;
