import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useStripe } from "@stripe/react-stripe-js";

import CartSingleMeal from "./CartSingleMeal";
import { Typography } from "@material-ui/core";
import { addMealToOrder, removeMealFromOrder } from "../actions/orderActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "25em",
  },
  shoppingCart: {
    color: "white",
  },
  yourOrderContainer: {
    alignSelf: "flex-start",
  },
  yourOrder: {
    paddingLeft: ".8rem",
    fontSize: "1.5rem",
    fontWeight: "bolder",
  },
  checkoutButtonContainer: {
    justifyContent: "center",
  },
  checkoutButton: {
    width: "100%",
    textAlign: "left",
  },
  checkoutText: {
    marginRight: "auto",
    fontSize: "1rem",
  },
  subPriceText: {
    fontSize: "0.8rem",
  },
}));

const Cart = ({ order, meals, removeMealFromOrder }) => {
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);
  // const [mealSet, setMealSet] =
  // const [orderCount, setOrderCount] = useState(1);

  // const toggleDrawer = (open) => {
  //   setOpenDrawer(open);
  // };

  const stripe = useStripe();
  const handleCheckout = async (event) => {
    setOpenDrawer(false);

    // Call your backend to create the Checkout Session
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  const totalPrice = (function findTotalPrice(order) {
    return [...order.values()]
    .reduce((accumulator,currentVal) => accumulator + currentVal[0].price * currentVal[1],
      0
    );

  })(order);

  return (
    <>
      <IconButton
        className={classes.shoppingCart}
        aria-label="open shopping cart"
        onClick={() => {
          setOpenDrawer(!openDrawer);
        }}
        disableRipple
        disableFocusRipple
      >
        <Badge badgeContent={[...order.values()].reduce((acc,item) => acc + item[1],0)} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
        <Grid
          container
          direction="row"
          justify="center"
          spacing={1}
          className={classes.root}
        >
          <Grid item xs={12} className={classes.yourOrderContainer}>
            <Typography className={classes.yourOrder}>Your Order</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={11} className={classes.checkoutButtonContainer}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.checkoutButton}
              size="large"
              onClick={handleCheckout}
              component={Link}
              to="/checkout"
            >
              <Typography variant="button" className={classes.checkoutText}>
                CHECKOUT
              </Typography>
              <Typography variant="subtitle2" className={classes.subPriceText}>
                ${totalPrice}
              </Typography>
            </Button>
          </Grid>
          {[...order.entries()].map(cartItem => (
            <CartSingleMeal
              key={cartItem[0]}
              meal={cartItem[1][0]}
              quantity ={cartItem[1][1]}
              handleRemove={() => {
                removeMealFromOrder(cartItem[1][0].id);
              }}
            />
          ))}
        </Grid>
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => ({
  order: state.order.order,
  meals: state.meal.meals,
});

export default connect(mapStateToProps, {
  addMealToOrder,
  removeMealFromOrder,
})(Cart);
