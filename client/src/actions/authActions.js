import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types";

export const loadUser = () => async (dispatch, getState) => {
  // trigger USER_LOADING
  dispatch({ type: USER_LOADING });

  // get token from localStorage
  const token = getState().auth.token;

  // set header
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // pass along token, if it exists
  if (token) config.headers["authorization"] = token;

  try {
    const res = axios.get("/api/auth/user", config);
    dispatch({ type: USER_LOADED, payload: res });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};
