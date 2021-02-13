import axios from "axios";
import { ROOT_ENDPOINT } from "../utils/constants";
import { returnErrors } from "./errorActions";
import {
  ADD_ORDER,
  ADD_ORDER_FAIL,
  ADD_MEAL_TO_ORDER,
  REMOVE_MEAL_FROM_ORDER,
  SET_DELIVERY_TIME,
  SET_DELIVERY_TYPE,
} from "../actions/types";
import { tokenConfig } from "./shared";
import { Order } from "../utils/order";

export const addOrder = () => async (dispatch, getState) => {
  
  try {
    const endpoint = `${ROOT_ENDPOINT}/api/orders/`;
    const order = 
    {
      user: getState().auth.user.id,
      meals: getState().order.order.mealIds,
      payment: getState().payment.confirmedPaymentIntent.payment_method,
      amount: getState().payment.amount,
      deliveryTime: getState().order.order.orderTime,
      type: getState().order.order.orderType,
    };
    console.log('adding order',order);
    const res = await axios.post(endpoint,order,tokenConfig(getState));
    
    dispatch({ type: ADD_ORDER, payload: res.data.order });
  } catch (err) {
    if (err.response) {
      dispatch(
        returnErrors(
          err.response.data.error,
          err.response.status,
          ADD_ORDER_FAIL
        )
      );
    }
    dispatch({ type: ADD_ORDER_FAIL });
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

export const setDeliveryTime = (time) => (dispatch, getState) => {
  let newOrder = new Order(getState().order.order.getOrderDetails());

  newOrder.setTime(time);
  dispatch({
    type: SET_DELIVERY_TIME,
    payload: newOrder,
  });
};

export const setDeliveryType = (type) => (dispatch, getState) => {
  let newOrder = new Order(getState().order.order.getOrderDetails());

  newOrder.setType(type);
  dispatch({
    type: SET_DELIVERY_TYPE,
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
