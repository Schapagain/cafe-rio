import {
  ADD_MEAL,
  GET_MEALS,
  //   GET_MEAL_INFO,
  //   GET_MEAL_PHOTO,
  //   DELETE_MEAL,
} from "../actions/types";

const initialState = {
  meals: [
    { id: "12412", name: "Burger", price: "20", category: "take-out" },
    {
      id: "34543",
      name: "Sphagetti & Meatballs",
      price: "10",
      category: "dine-in",
    },
  ],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MEAL:
      return {
        meals: state.meals
          ? state.meals.concat(action.payload)
          : action.payload,
      };
    case GET_MEALS:
      return {
        ...state,
      };
    default:
      return state;
  }
}
