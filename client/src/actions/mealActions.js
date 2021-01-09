import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  ADD_MEAL,
  GET_MEALS,
  DELETE_MEAL,
  MEALS_LOADING,
  GET_MEALS_FAIL,
  ADD_MEAL_FAIL,
  DELETE_MEAL_FAIL,
  //   GET_MEAL_PHOTO,
  //   ADD_MEAL_FAIL,
  //   ADD_MEAL_FAIL,
  //   GET_MEAL_INFO,
  //   GET_MEAL_PHOTO,
} from "../actions/types";

const rootEndpoint =
  process.env.NODE_ENV === "production" ? "https://cafe-rio.herokuapp.com" : "";

export const getMeals = () => async (dispatch) => {
  dispatch(setMealsLoading());
  try {
    const endpoint = `${rootEndpoint}/api/meals`;
    const res = await axios.get(endpoint);
    return dispatch({
      type: GET_MEALS,
      payload: res.data.data,
    });
  } catch (err) {
    if (err.response)
      dispatch(returnErrors(err.response.error, err.response.status));
    dispatch({ type: GET_MEALS_FAIL });
  }
};

export const addMeal = (meal) => async (dispatch) => {
  try {
    const endpoint = `${rootEndpoint}/api/meals`;
    const res = await axios.post(endpoint, meal);
    return dispatch({
      type: ADD_MEAL,
      payload: res.data,
    });
  } catch (err) {
    if (err.response)
      dispatch(returnErrors(err.response.error, err.response.status));
    dispatch({ type: ADD_MEAL_FAIL });
  }
};

export const deleteMeal = (id) => async (dispatch) => {
  try {
    const endpoint = `${rootEndpoint}/api/meals/${id}`;
    await axios.delete(endpoint);
    return dispatch({
      type: DELETE_MEAL,
      payload: id,
    });
  } catch (err) {
    if (err.response)
      dispatch(returnErrors(err.response.error, err.response.status));
    dispatch({ type: DELETE_MEAL_FAIL });
  }
};

export const setMealsLoading = () => {
  return {
    type: MEALS_LOADING,
  };
};
