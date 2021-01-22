import {
  ADD_MEAL_TO_ORDER,
  REMOVE_MEAL_FROM_ORDER,
} from "../actions/types";

const initialState = {
  order: localStorage.getItem("order")
    ? new Map(JSON.parse(localStorage.getItem("order")))
    : new Map(),
  userId: localStorage.getItem("userId"),
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // case ADD_ORDER:
    //   return
    case ADD_MEAL_TO_ORDER:
    case REMOVE_MEAL_FROM_ORDER:
      localStorage.setItem("order", JSON.stringify(Array.from((action.payload).entries())));
      return {
        ...initialState,
        order: action.payload,
      };
    default:
      return state;
  }
}
