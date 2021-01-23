import {
  CREATE_PAYMENT_INTENT_SUCCESS,
  CREATE_PAYMENT_INTENT_FAIL,
  CONFIRM_CARD_PAYMENT_SUCCESS,
  CONFIRM_CARD_PAYMENT_FAIL,
  PAYMENT_PROCESSING,
} from "../actions/types";

const initialState = {
  isLoading: false,
  clientSecret: null,
  confirmedPaymentIntent: {},
  amount: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PAYMENT_PROCESSING:
      return { ...state, isLoading: true };
    case CREATE_PAYMENT_INTENT_SUCCESS:
      console.log(action.payload.clientSecret);
      return {
        ...state,
        clientSecret: action.payload.clientSecret,
        amount: action.payload.amount,
      };
    case CONFIRM_CARD_PAYMENT_SUCCESS:
      console.log(action.payload.paymentIntent);
      return {
        ...state,
        confirmedPaymentIntent: action.payload.paymentIntent,
        isLoading: false,
      };
    case CREATE_PAYMENT_INTENT_FAIL:
    case CONFIRM_CARD_PAYMENT_FAIL:
      return { ...state, isLoading: false, confirmedPaymentIntent: null };
    default:
      return state;
  }
}
