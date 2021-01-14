import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    margin: theme.spacing(3, 0, 0, 1),
  },
}));

const CheckoutButtons = ({
  isFinalStep,
  handleNext,
  handleBack,
  activeStep,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.buttons}>
      {activeStep > 0 && (
        <Button onClick={handleBack} className={classes.button}>
          Back
        </Button>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
        className={classes.button}
      >
        {isFinalStep ? "Place Order" : "Next"}
      </Button>
    </div>
  );
};

export default CheckoutButtons;
