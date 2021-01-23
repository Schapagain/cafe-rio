import axios from "axios";
import { ROOT_ENDPOINT } from "../constants";
import { returnErrors } from "./errorActions";
import {
  ADD_ORDER,
  ADD_ORDER_FAIL,
  ADD_MEAL_TO_ORDER,
  REMOVE_MEAL_FROM_ORDER,
} from "../actions/types";
import { tokenConfig } from "./shared";
import { Order } from "../utils/order";

export const addOrder = (user, meals, payment, amount) => async (
  dispatch,
  getState
) => {
  try {
    const endpoint = `${ROOT_ENDPOINT}/api/orders/`;
    const res = await axios.post(
      endpoint,
      { user, meals, payment, amount },
      tokenConfig(getState)
    );
    console.log(res);
    dispatch({ type: ADD_ORDER, payload: res.order });
  } catch (err) {
    console.log(err.response);
    if (err)
      dispatch(
        returnErrors(
          err.response.data.error,
          err.response.status,
          ADD_ORDER_FAIL
        )
      );
    // dispatch({ type: ADD_ORDER_FAIL });
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
