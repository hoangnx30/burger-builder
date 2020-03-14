import { combineReducers } from "redux";

import burderBuilderReducer from "./burgerBuilder.reducer";
import orderReducer from "./order.reducer";
import authReducer from "./auth.reducer";

const rootReducer = combineReducers({
  burgerBuilderState: burderBuilderReducer,
  orderState: orderReducer,
  authState: authReducer
});

export default rootReducer;
