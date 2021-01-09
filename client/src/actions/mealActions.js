import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  GET_MEALS,
  GET_MEALS_FAIL,
  GET_MEAL_PHOTO,
  //   ADD_MEAL,
  //   ADD_MEAL_FAIL,
  //   ADD_MEAL_FAIL,
  //   GET_MEAL_INFO,
  //   GET_MEAL_PHOTO,
  //   DELETE_MEAL,
} from "../actions/types";

const rootEndpoint =
  process.env.NODE_ENV === "production" ? "https://cafe-rio.herokuapp.com" : "";

export const getMeals = () => async (dispatch, getState) => {
  try {
    const endpoint = `${rootEndpoint}/api/meals`;
    const res = await axios.get(endpoint);
    dispatch({ type: GET_MEALS, payload: res.data });
  } catch (err) {
    console.log(err);
    // if (err.response)
    //   dispatch(returnErrors(err.response.error, err.response.status));
    // dispatch({ type: ADD_MEAL_FAIL });
  }
};
