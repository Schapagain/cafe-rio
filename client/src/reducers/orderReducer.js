import {
  // ADD_ORDER,
  ADD_MEAL_TO_ORDER,
  REMOVE_MEAL_FROM_ORDER,
} from "../actions/types";
import { Order } from "../utils/order";

const initialState = {
  order: new Order(JSON.parse(localStorage.getItem("order"))),
  userId: localStorage.getItem("userId"),
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // case ADD_ORDER:
    //   return
    case ADD_MEAL_TO_ORDER:
    case REMOVE_MEAL_FROM_ORDER:
      localStorage.setItem("order", action.payload.jsonStringifiedOrder);
      return {
        ...initialState,
        order: action.payload,
      };
    default:
      return state;
  }
}
