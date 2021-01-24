import {
  ADD_ORDER,
  ADD_MEAL_TO_ORDER,
  REMOVE_MEAL_FROM_ORDER,
  CLEAR_CART,
} from "../actions/types";
import { Order } from "../utils/order";

const initialState = {
  order: new Order(JSON.parse(localStorage.getItem("order"))),
  userId: localStorage.getItem("userId"),
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER: // will use this later
      return state;
    case ADD_MEAL_TO_ORDER:
    case REMOVE_MEAL_FROM_ORDER:
      localStorage.setItem("order", action.payload.jsonStringifiedOrder);
      return {
        ...initialState,
        order: action.payload,
      };
    case CLEAR_CART:
      localStorage.removeItem("order");
      return {
        ...state,
        order: null,
      };
    default:
      return state;
  }
}
