import { ADD_MEAL_TO_ORDER, REMOVE_MEAL_FROM_ORDER } from "../actions/types";

export const addMealToOrder = (meal) => (dispatch, getState) => {
  //   console.log("meal here");
  //   console.log(getState());
  let order = getState().order.order;
  order.push(meal);
  //   console.log(order);
  dispatch({
    type: ADD_MEAL_TO_ORDER,
    payload: order,
  });
};

export const removeMealFromOrder = (mealId) => (dispatch, getState) => {
  let order = getState().order.order;
  const index = order.indexOf(mealId);
  if (index > -1) order.splice(index, 1);

  return dispatch({
    type: REMOVE_MEAL_FROM_ORDER,
    payload: order,
  });
};
