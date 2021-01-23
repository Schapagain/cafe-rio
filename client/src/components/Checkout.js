import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import CheckoutOrderReview from "./CheckoutOrderReview";
import CheckoutForm from "./CheckoutForm";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

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

const Checkout = ({isAuthenticated}) => {
  const classes = useStyles();
  let history = useHistory();
  useEffect(()=> {
    if (!isAuthenticated) {
      history.push({
        pathname: "/login",
        state: {checkoutFail: true}
      })
    }
  })

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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Checkout);

