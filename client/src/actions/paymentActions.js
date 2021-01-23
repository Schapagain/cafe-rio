import axios from "axios";
import { returnErrors } from "./errorActions";
import { ROOT_ENDPOINT } from "../constants";
import {
  CREATE_PAYMENT_INTENT_SUCCESS,
  CREATE_PAYMENT_INTENT_FAIL,
  CONFIRM_CARD_PAYMENT_SUCCESS,
  CONFIRM_CARD_PAYMENT_FAIL,
  PAYMENT_PROCESSING,
} from "../actions/types";
import { tokenConfig } from "./shared";

export const createPaymentIntent = (user, meals) => async (
  dispatch,
  getState
) => {
  try {
    const endpoint = `${ROOT_ENDPOINT}/api/orders/create_intent`;
    const res = await axios.post(
      endpoint,
      { user, meals },
      tokenConfig(getState)
    );
    console.log(res);
    dispatch({
      type: CREATE_PAYMENT_INTENT_SUCCESS,
      payload: { amount: res.data.amount, clientSecret: res.data.secret },
    });
  } catch (err) {
    if (err)
      dispatch(
        returnErrors(
          err.response.data.error,
          err.response.status,
          CREATE_PAYMENT_INTENT_FAIL
        )
      );
    dispatch({ type: CREATE_PAYMENT_INTENT_FAIL });
  }
};

export const confirmCardPayment = (
  stripe,
  clientSecret,
  paymentMethod
) => async (dispatch) => {
  try {
    dispatch({ type: PAYMENT_PROCESSING });
    // console.log("dd");
    // console.log(clientSecret);
    const res = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod,
    });

    // console.log(res.paymentIntent);

    if (res.error) {
      dispatch(
        returnErrors(
          res.error.message,
          res.error.code,
          CONFIRM_CARD_PAYMENT_FAIL
        )
      );
      dispatch({ type: CONFIRM_CARD_PAYMENT_FAIL });
    } else {
      dispatch({
        type: CONFIRM_CARD_PAYMENT_SUCCESS,
        payload: { paymentIntent: res.paymentIntent },
      });
    }
  } catch (err) {
    dispatch({ type: CONFIRM_CARD_PAYMENT_FAIL });
  }
};
