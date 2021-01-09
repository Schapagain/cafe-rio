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
  DELETE_MEAL,
} from "../actions/types";

const rootEndpoint =
  process.env.NODE_ENV === "production" ? "https://cafe-rio.herokuapp.com" : "";

export const getMeals = () => {
  return { type: GET_MEALS };
};

export const deleteMeal = (id) => {
  return { type: DELETE_MEAL, payload: id };
};
