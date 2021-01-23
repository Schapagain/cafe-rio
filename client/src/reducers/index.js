import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import mealReducer from "./mealReducer";
import orderReducer from "./orderReducer";
import paymentReducer from "./paymentReducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  meal: mealReducer,
  order: orderReducer,
  payment: paymentReducer,
});
