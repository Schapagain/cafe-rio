import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { connect } from "react-redux";

import { addOrder } from "../actions/orderActions";
import {
  createPaymentIntent,
  confirmCardPayment,
} from "../actions/paymentActions";

const CheckoutForm = ({
  order,
  user,
  addOrder,
  payment,
  error,
  createPaymentIntent,
  confirmCardPayment,
}) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  // error msg state
  useEffect(() => {
    if (error.id === "CONFIRM_CARD_PAYMENT_FAIL") {
      setErrorMsg(error.msg);
    }
  }, [error]);

  useEffect(() => {
    createPaymentIntent();
  });

  const handleClick = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    await confirmCardPayment(stripe, payment.clientSecret, {
      card: elements.getElement(CardElement),
    });
    addOrder();
  };

  return (
    <div>
      <CardElement />
      <Button
        variant="contained"
        color="secondary"
        disabled={!stripe || payment.isLoading || !payment.clientSecret}
        onClick={handleClick}
      >
        Pay Now
      </Button>
      {errorMsg}
    </div>
  );
};

const mapStateToProps = (state) => ({
  order: state.order.order,
  user: state.auth.user,
  payment: state.payment,
  error: state.error,
});

export default connect(mapStateToProps, {
  addOrder,
  createPaymentIntent,
  confirmCardPayment,
})(CheckoutForm);
