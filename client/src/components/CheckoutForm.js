import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { connect } from "react-redux";

import { addOrder } from "../actions/orderActions";

const CheckoutForm = ({ order, user, addOrder }) => {
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    console.log(order);
    console.log(user);
    console.log(addOrder);
  });

  const handleClick = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    addOrder(
      paymentMethod.id,
      order.map((meal) => meal.id),
      user.id
    );
  };

  return (
    <div>
      <CardElement />
      <Button
        variant="contained"
        color="secondary"
        disabled={!stripe}
        onClick={handleClick}
      >
        Pay Now
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  order: state.order.order,
  user: state.auth.user,
});

export default connect(mapStateToProps, { addOrder })(CheckoutForm);
