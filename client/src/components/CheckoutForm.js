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
  const [disabled, setDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  // error msg state
  useEffect(() => {
    if (error.id === "CONFIRM_CARD_PAYMENT_FAIL") {
      setErrorMsg(error.msg);
    }
  }, [error]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Roboto, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  useEffect(() => {
    createPaymentIntent();
  });

  const handleChange = async (e) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(e.empty);
    setErrorMsg(e.error ? e.error.message : "");
  };

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
      <div
        style={{
          margin: "0.5rem",
        }}
      />
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color="secondary"
        disabled={
          !stripe || payment.isLoading || !payment.clientSecret || disabled
        }
        onClick={handleClick}
        style={{ padding: "0.5rem", marginTop: "0.8rem" }}
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
