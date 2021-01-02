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

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, isLoading: true };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
}