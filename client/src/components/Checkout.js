import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import CheckoutOrderReview from "./CheckoutOrderReview";
import CheckoutForm from "./CheckoutForm";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
  },
}));

const Checkout = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <CheckoutOrderReview />
        <CheckoutForm />
      </Paper>
    </div>
  );
};

export default Checkout;
