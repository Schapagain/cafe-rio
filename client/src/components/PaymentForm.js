import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { connect } from "react-redux";

import { addOrder, setDeliveryTime, setDeliveryType } from "../actions/orderActions";
import { confirmCardPayment } from "../actions/paymentActions";


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   marginTop: theme.spacing(2),
  // },
  payment: {
    fontSize: "1.8rem",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const PaymentForm = ({ addOrder, setDeliveryTime, setDeliveryType, payment, error, confirmCardPayment }) => {
  const [disabled, setDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();

  const [deliveryType, setType] = useState("dinein");
  const [deliveryTime, setTime] = useState(1);

  const handleTimeChange = e => {
    setTime(e.target.value);
    setDeliveryTime(e.target.value);
  }
  const handleTypeChange = e => {
    setType(e.target.value);
    setDeliveryType(e.target.value);
  }

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
    console.log('almost adding order')
    addOrder();
  };

  return (
    <Grid container justify="center" className={classes.root} spacing={1}>
      <Grid item xs={12}>
        <Typography className={classes.payment}>Order Details</Typography>
      </Grid>
      <Grid item xs={12}>
      <FormControl className={classes.formControl}>
        <InputLabel id="type-select-label">Order Type</InputLabel>
        <Select
          labelId="type-select-label"
          value={deliveryType}
          onChange={handleTypeChange}
        >
          <MenuItem value="dinein">Dine in</MenuItem>
          <MenuItem value="delivery">Delivery</MenuItem>
          <MenuItem value="takeout">Take Out</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="time-select-label">Delivery Time</InputLabel>
        <Select
          labelId="time-select-label"
          value={deliveryTime}
          onChange={handleTimeChange}
        >
          <MenuItem value={1}>In an hour</MenuItem>
          <MenuItem value={2}>In 2 hours</MenuItem>
          <MenuItem value={3}>In 3 hours</MenuItem>
        </Select>
        <FormHelperText>Times are relative to order time</FormHelperText>
      </FormControl>
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
  setDeliveryTime,
  setDeliveryType,
  confirmCardPayment,
})(PaymentForm);
