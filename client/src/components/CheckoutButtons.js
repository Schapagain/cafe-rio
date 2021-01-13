import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));

const CheckoutButtons = ({
  isFinalStep,
  handleNext,
  handleBack,
  activeStep,
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={0}
      justify="flex-end"
      className={classes.buttonsContainer}
    >
      {activeStep > 0 && (
        <Grid item xs={2}>
          <Button onClick={handleBack} className={classes.button}>
            Back
          </Button>
        </Grid>
      )}
      <Grid item xs={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
        >
          {isFinalStep ? "Place Order" : "Next"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CheckoutButtons;
