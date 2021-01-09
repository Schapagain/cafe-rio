import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import mealReducer from "./mealReducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  meals: mealReducer,
});
