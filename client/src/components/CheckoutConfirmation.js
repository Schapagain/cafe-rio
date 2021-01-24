import React from "react";
import Typography from "@material-ui/core/Typography";

const CheckoutConfirmation = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Thank you for your order.
      </Typography>
      <Typography variant="subtitle1">
        We have emailed your order confirmation, and will send you an update
        when your order is ready
      </Typography>
    </>
  );
};

export default CheckoutConfirmation;
