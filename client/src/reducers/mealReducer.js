import {
  ADD_MEAL,
  DELETE_MEAL,
  GET_MEALS,
  MEALS_LOADING,
  //   GET_MEAL_INFO,
  //   GET_MEAL_PHOTO,
  //   DELETE_MEAL,
} from "../actions/types";

const initialState = {
  meals: [],
  loading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MEAL:
      return {
        ...state,
        meals: [action.payload, ...state.meals],
        loading: false,
      };
    case GET_MEALS:
      return {
        ...state,
        meals: action.payload,
      };
    case DELETE_MEAL:
      return {
        ...state,
        meals: state.meals.filter((meal) => meal.id !== action.payload),
      };
    case MEALS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
