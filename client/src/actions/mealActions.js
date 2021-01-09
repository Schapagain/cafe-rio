import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  ADD_MEAL,
  GET_MEALS,
  DELETE_MEAL,
  MEALS_LOADING,
  //   GET_MEALS_FAIL,
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
  const endpoint = `${rootEndpoint}/api/meals`;
  const res = await axios.get(endpoint);
  return dispatch({
    type: GET_MEALS,
    payload: res.data.data,
  });
};

export const addMeals = (meal) => async (dispatch) => {
  const endpoint = `${rootEndpoint}/api/meals`;
  const res = await axios.post(endpoint, meal);
  return dispatch({
    type: GET_MEALS,
    payload: res.data,
  });
};

export const deleteMeal = (id) => async (dispatch) => {
  const endpoint = `${rootEndpoint}/api/meals/${id}`;
  await axios.delete(endpoint);
  return dispatch({
    type: DELETE_MEAL,
    payload: id,
  });
};

export const setMealsLoading = () => {
  return {
    type: MEALS_LOADING,
  };
};
