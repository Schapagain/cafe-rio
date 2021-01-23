import {
  ADD_MEAL,
  DELETE_MEAL,
  GET_MEALS,
  MEALS_LOADING,
  GET_MEALS_FAIL,
  ADD_MEAL_FAIL,
  DELETE_MEAL_FAIL,
  GET_MEAL_INFO,
  GET_MEAL_INFO_FAIL,
} from "../actions/types";

const initialState = {
  meals: [],
  isLoading: false,
  selectedMeal: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MEAL:
      return {
        ...state,
        meals: [action.payload, ...state.meals],
      };
    case GET_MEALS:
      return {
        ...state,
        meals: action.payload,
        isLoading: false,
      };
    case GET_MEAL_INFO:
      return {
        ...state,
        selectedMeal: action.payload,
        isLoading: false,
      };
    case DELETE_MEAL:
      return {
        ...state,
        meals: state.meals.filter((meal) => meal.id !== action.payload),
      };
    case MEALS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_MEALS_FAIL:
    case GET_MEAL_INFO_FAIL:
    case ADD_MEAL_FAIL:
    case DELETE_MEAL_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
