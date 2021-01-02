import axios from "axios";
import { returnErrors } from "./errorAction";
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

  try {
    const res = axios.get("/api/auth/user", tokenConfig(getState));
    dispatch({ type: USER_LOADED, payload: res });
  } catch (err) {
    if (err.response)
      dispatch(returnErrors(err.response.error, err.response.status));
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const signUp = (userDetails) => async (dispatch) => {
  // set content-type header
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //Request body
  const body = JSON.stringify(userDetails);

  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    if (err.response)
      dispatch(
        returnErrors(err.response.error, err.response.status),
        "REGISTER_FAIL"
      );
    dispatch({ type: REGISTER_FAIL });
  }
};

export const tokenConfig = (getState) => {
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

  return config;
};
