import {
  ADD_MEAL,
  GET_MEALS,
  //   GET_MEAL_INFO,
  //   GET_MEAL_PHOTO,
  //   DELETE_MEAL,
} from "../actions/types";

const initialState = {
  meals: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MEAL:
      return {
        meals: state.meals.concat(action.payload),
      };
    case GET_MEALS:
      return {
        meals: state.meals.concat(action.payload),
      };
    default:
      console.log("null");
      return;
  }
}
