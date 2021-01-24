import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

import store from "../store";
import { FINISH_CHECKOUT, CLEAR_CART } from "../actions/types";

const CheckoutConfirmation = () => {
  const history = useHistory();

  useEffect(() => {
    store.dispatch({ type: CLEAR_CART });
  }, []);

  const handleClick = () => {
    store.dispatch({ type: FINISH_CHECKOUT });
    history.push("/");
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Thank you for your order.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">
          We have emailed your order confirmation, and will send you an update
          when your order is ready
        </Typography>
      </Grid>
      <Grid container justify="flex-end" item xs={12}>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleClick}
          >
            Continue Shopping
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckoutConfirmation;
