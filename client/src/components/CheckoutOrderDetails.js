import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";

import { PAYMENT } from "../constants";

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(2),
  },
}));

const CheckoutDetails = () => {
  const classes = useStyles();

  const [paymentMethod, setPaymentMethod] = useState();
  const [nameOnCard, setNameOnCard] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [cvcNumber, setCvcNumber] = useState();

  const handleChange = (setValue, value) => {
    setValue(value);
  };

  return (
    <>
      <Typography component="h2" variant="h6" className={classes.header}>
        Payment Method
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select a payment method</FormLabel>
            <RadioGroup
              aria-label="payment method"
              name="payment"
              value={paymentMethod ? paymentMethod : PAYMENT.creditCard}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
              row
            >
              <FormControlLabel
                value={PAYMENT.creditCard}
                control={<Radio />}
                label="Credit Card"
              />
              <FormControlLabel
                value={PAYMENT.stripe}
                control={<Radio />}
                label="Stripe"
              />
              <FormControlLabel
                value={PAYMENT.paypal}
                control={<Radio />}
                label="Paypal"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            // margin="normal"
            required
            name="nameOnCard"
            label="Name on Card"
            id="name-on-card"
            value={nameOnCard}
            onChange={(e) => {
              setNameOnCard(e.target.value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            name="cardNumber"
            label="Card Number"
            id="card-number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <KeyboardDatePicker
            variant="inline"
            inputVariant="standard"
            views={["year", "month"]}
            label="Expiry Date"
            format="MM/yyyy"
            value={expiryDate}
            onChange={setExpiryDate}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            name="cvcNumber"
            label="CVV/CVC"
            id="cvc-number"
            type="number"
            value={cvcNumber}
            onChange={(e) => setCvcNumber(e.target.value)}
            fullWidth
            inputProps={{
              min: 0,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}></Grid>
      </Grid>
    </>
  );
};

export default CheckoutDetails;
