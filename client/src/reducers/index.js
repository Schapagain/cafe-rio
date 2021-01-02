import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./auth_reducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
});
