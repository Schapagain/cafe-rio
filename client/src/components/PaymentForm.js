import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { connect } from "react-redux";

import { addOrder } from "../actions/orderActions";
import {
  createPaymentIntent,
  confirmCardPayment,
} from "../actions/paymentActions";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   marginTop: theme.spacing(2),
  // },
  payment: {
    fontSize: "1.8rem",
  },
}));

const PaymentForm = ({
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
  const classes = useStyles();

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

    if (error.id === "CONFIRM_CARD_PAYMENT_FAIL") return;

    addOrder();
  };

  return (
    <Grid container justify="center" className={classes.root} spacing={1}>
      <Grid item xs={12}>
        <Typography className={classes.payment}>Payment Details</Typography>
      </Grid>
      <Grid item xs={12}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          disabled={
            !stripe || payment.isLoading || !payment.clientSecret || disabled
          }
          onClick={handleClick}
        >
          Pay Now
        </Button>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  payment: state.payment,
  error: state.error,
});

export default connect(mapStateToProps, {
  addOrder,
  createPaymentIntent,
  confirmCardPayment,
})(PaymentForm);
