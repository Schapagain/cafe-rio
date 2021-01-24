import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import CheckoutOrderReview from "./CheckoutOrderReview";
import CheckoutConfirmation from "./CheckoutConfirmation";
import Spinner from "./Spinner";
import PaymentForm from "./PaymentForm";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { PAYMENT_STATUS } from "../utils/constants";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "auto",
    marginTop: theme.spacing(2),
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
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  title: {
    fontWeight: "bold",
    fontSize: "3rem",
  },
}));

const Checkout = ({ isAuthenticated, payment }) => {
  const classes = useStyles();
  let history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push({
        pathname: "/login",
        state: { checkoutFail: true },
      });
    }
  });

  return (
    <div className={classes.container}>
      {payment.status === PAYMENT_STATUS.load_checkout ? (
        <>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            className={classes.title}
          >
            Checkout
          </Typography>
          <Paper className={classes.paper}>
            <CheckoutOrderReview />
          </Paper>
          <Paper className={classes.paper}>
            <PaymentForm />
          </Paper>
        </>
      ) : payment.status === PAYMENT_STATUS.success ? (
        <Paper className={classes.paper}>
          <CheckoutConfirmation />
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Spinner />
        </Paper>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  payment: state.payment,
});

export default connect(mapStateToProps)(Checkout);
