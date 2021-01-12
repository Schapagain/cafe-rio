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
  userId: localStorage.getItem("userId"),
  isAuthenticated: false,
  isLoading: false,
  user: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, isLoading: true };

    case USER_LOADED:
      return {
        ...state,
        token: localStorage.getItem("token"),
        userId: localStorage.getItem("userId"),
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.user.id);
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.user.id,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      return {
        ...state,
        token: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
        user: {},
      };

    default:
      return state;
  }
}
