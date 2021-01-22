import axios from "axios";
import { ROOT_ENDPOINT } from "../constants";
import { returnErrors } from "./errorActions";
import {
  ADD_ORDER,
  ADD_MEAL_TO_ORDER,
  REMOVE_MEAL_FROM_ORDER,
} from "../actions/types";
import { tokenConfig } from "./authActions";
import { Order } from "../utils/order";

export const addOrder = (cardId, order, user) => async (dispatch, getState) => {
  try {
    const body = {
      meals: order,
      user,
      cardId,
    };
    const endpoint = `${ROOT_ENDPOINT}/api/orders`;
    const res = await axios.post(endpoint, body, tokenConfig(getState));
  } catch (err) {
    // console.log(err.response);
    if (err)
      dispatch(returnErrors(err.response.data.error, err.response.status));
    // dispatch({ type: AUTH_ERROR });
  }
};

export const addMealToOrder = (meal) => (dispatch, getState) => {
  let newOrder = new Order(getState().order.order.getOrderDetails());

  newOrder.addMeal(meal);
  dispatch({
    type: ADD_MEAL_TO_ORDER,
    payload: newOrder,
  });
};

export const removeMealFromOrder = (id) => (dispatch, getState) => {
  let newOrder = new Order(getState().order.order.getOrderDetails());
  newOrder.removeMeal(id);

  return dispatch({
    type: REMOVE_MEAL_FROM_ORDER,
    payload: newOrder,
  });
};
