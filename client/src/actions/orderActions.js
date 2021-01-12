import { ADD_MEAL_TO_ORDER, REMOVE_MEAL_FROM_ORDER } from "../actions/types";

export const addMealToOrder = (meal) => (dispatch, getState) => {
  let newOrder = [...getState().order.order];
  newOrder.push(meal);
  dispatch({
    type: ADD_MEAL_TO_ORDER,
    payload: newOrder,
  });
};

export const removeMealFromOrder = (index) => (dispatch, getState) => {
  let newOrder = [...getState().order.order];
  newOrder.splice(index, 1);
  return dispatch({
    type: REMOVE_MEAL_FROM_ORDER,
    payload: newOrder,
  });
};
