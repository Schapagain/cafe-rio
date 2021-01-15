import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";

// import CheckoutOrderReview from "./CheckoutOrderReview";
// import CheckoutConfirmation from "./CheckoutConfirmation";
// import CheckoutDetails from "./CheckoutOrderDetails";
import CheckoutButtons from "./CheckoutButtons";

// const useStyles = makeStyles((theme) => ({
//   container: {},
// }));

const Checkout = () => {
  // const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Order Details", "Review Your Order"];

  return (
    // <Grid container justify="center">
    //   <Grid item xs={12} md={7}>
    <Container maxWidth="sm">
      <Paper>
        <Typography variant="h6">Checkout</Typography>
        <Stepper activeStep={activeStep}>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <CheckoutButtons
          handleBack={() => {
            setActiveStep(activeStep - 1);
          }}
          handleNext={() => {
            setActiveStep(activeStep + 1);
          }}
          activeStep={activeStep}
          isFinalStep={activeStep === steps.length - 1}
        />
      </Paper>
    </Container>
    //   </Grid>
    // </Grid>
  );
};

export default Checkout;
