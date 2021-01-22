import axios from "axios";
import { ROOT_ENDPOINT } from "../constants";
import { returnErrors } from "./errorActions";
import {
  ADD_ORDER,
  ADD_MEAL_TO_ORDER,
  REMOVE_MEAL_FROM_ORDER,
} from "../actions/types";

import { tokenConfig } from "./authActions";

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
    console.log(err.response);
    if (err)
      dispatch(returnErrors(err.response.data.error, err.response.status));
    // dispatch({ type: AUTH_ERROR });
  }
};

export const addMealToOrder = (meal) => (dispatch, getState) => {
  let newOrder = new Map(getState().order.order);
  const newQuantity = newOrder.has(meal.id) 
    ? newOrder.get(meal.id)[1] + 1 
    : 1;
  newOrder.set(meal.id,[meal,newQuantity]);
  dispatch({
    type: ADD_MEAL_TO_ORDER,
    payload: newOrder,
  });
};

export const removeMealFromOrder = (id) => (dispatch, getState) => {
  let newOrder = new Map(getState().order.order);
  if (!newOrder.has(id)) return;
  
  const meal = newOrder.get(id);
  const oldQuantity = meal[1];
  if (oldQuantity > 1) {
    newOrder.set(id,[meal[0],oldQuantity - 1]);
  }else {
    newOrder.delete(id);
  }

  return dispatch({
    type: REMOVE_MEAL_FROM_ORDER,
    payload: newOrder,
  });
};
