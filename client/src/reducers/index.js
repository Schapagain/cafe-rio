import { combineReducers } from "redux";
import errorReducer from "./error_reducer";
import authReducer from "./auth_reducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
});
