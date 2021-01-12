import { ADD_MEAL_TO_ORDER, REMOVE_MEAL_FROM_ORDER } from "../actions/types";

const initialState = {
  order: localStorage.getItem("order")
    ? JSON.parse(localStorage.getItem("order"))
    : [],
  userId: localStorage.getItem("userId"),
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MEAL_TO_ORDER:
    case REMOVE_MEAL_FROM_ORDER:
      console.log("payload");
      console.log(action.payload);
      localStorage.setItem("order", JSON.stringify(action.payload));
      return {
        ...initialState,
        order: action.payload,
      };
    default:
      return state;
  }
}
