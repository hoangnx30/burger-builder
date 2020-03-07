import { combineReducers } from "redux";

import burderBuilderReducer from "./burgerBuilder.reducer";
import orderReducer from "./order.reducer";

const rootReducer = combineReducers({
  burgerBuilderState: burderBuilderReducer,
  orderState: orderReducer
});

export default rootReducer;
