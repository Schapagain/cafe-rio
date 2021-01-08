import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
} from "./types";

export const loadUser = () => async (dispatch, getState) => {
  // trigger USER_LOADING
  dispatch({ type: USER_LOADING });
  console.log("callsed here");
  try {
    const userId = getState().auth.user;
    console.log("asdfadgf");
    console.log(userId);
    const res = await axios.get(`/api/users/${userId}`, tokenConfig(getState));
    // console.log(res);
    dispatch({ type: USER_LOADED, payload: res });
  } catch (err) {
    if (err.response)
      dispatch(returnErrors(err.response.error, err.response.status));
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const signUp = (newUser) => async (dispatch) => {
  // set content-type header
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //Request body
  // File objects can't be stringified,
  //  so we submit the body as FormData instead of JSON
  // const body = JSON.stringify(newUser);
  const body = newUser;

  const endpoint =
    process.env.NODE_ENV === "production"
      ? "https://cafe-rio.herokuapp.com/api/users/signup"
      : "http://localhost:5000/api/users/signup";

  try {
    const res = await axios.post(endpoint, body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // console.log("error", err.response);
    if (err.response) {
      // console.log("error", err);
      dispatch(
        returnErrors(
          err.response.data.error,
          err.response.status,
          "REGISTER_FAIL"
        )
      );
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

// log in
export const signIn = ({ email, password }) => async (dispatch) => {
  // set content-type header
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const endpoint =
    process.env.NODE_ENV === "production"
      ? "/api/users"
      : "http://localhost:5000/api/auth";

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(endpoint, body, config);

    console.log("res.data");
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) {
      dispatch(
        returnErrors(err.response.data.error, err.response.status, "LOGIN_FAIL")
      );
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

// logout
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
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

  console.log("token");
  console.log(token);

  return config;
};
