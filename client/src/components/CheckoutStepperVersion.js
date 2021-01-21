import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

import CheckoutOrderReview from "./CheckoutOrderList";
import CheckoutConfirmation from "./CheckoutConfirmation";
import CheckoutForm from "./CheckoutForm";
import CheckoutOrderDetails from "./CheckoutOrderDetails";
import CheckoutButtons from "./CheckoutButtons";
import { connect } from "react-redux";

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

const Checkout = ({ order }) => {
  useEffect(() => {
    console.log(order);
  });
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Order Details", "Review Your Order"];

  const getStepContents = (step) => {
    switch (step) {
      case 0:
        return <CheckoutForm />;
      // return <CheckoutOrderDetails />;
      case 1:
        return <CheckoutOrderReview />;
      default:
        throw new Error("unknown step");
    }
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <CheckoutOrderReview />
        <CheckoutForm />
        {/* <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </>
          ) : (
            <>
              {getStepContents(activeStep)}
              <CheckoutButtons
                isFinalStep={activeStep === steps.length - 1}
                handleNext={() => {
                  setActiveStep(activeStep + 1);
                }}
                handleBack={() => {
                  setActiveStep(activeStep - 1);
                }}
                activeStep={activeStep}
              />
            </>
          )}
        </> */}
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  order: state.order.order,
});

export default connect(mapStateToProps)(Checkout);
