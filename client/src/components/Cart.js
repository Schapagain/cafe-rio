import React, { useState } from "react";
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

import CartSingleMeal from "./CartSingleMeal";
import emptyCartImage from "../empty_cart.png";
import { Typography } from "@material-ui/core";
import { addMealToOrder, removeMealFromOrder } from "../actions/orderActions";
import { createPaymentIntent } from "../actions/paymentActions";
import store from "../store";
import { LOAD_CHECKOUT } from "../actions/types";

const useStyles = makeStyles(() => ({
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
  emptyCart: {
    marginTop: "100%",
  },
}));

const Cart = ({ order, createPaymentIntent, removeMealFromOrder }) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCheckout = async () => {
    setOpenDrawer(false);
    store.dispatch({ type: LOAD_CHECKOUT });
    createPaymentIntent();
  };

  const [mealsOrdered, totalPrice, totalMeals] = [
    order.meals,
    order.totalPrice,
    order.totalMeals,
  ];

  const emptyCart = (
    <Grid className={classes.emptyCart} item xs={10}>
      <img
        className={classes.emptyCartImage}
        src={emptyCartImage}
        alt="emtpy cart"
      />
    </Grid>
  );

  const cartWithItems = (
    <>
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
      {Array.from(mealsOrdered.keys()).map((mealId) => (
        <CartSingleMeal
          key={mealId}
          meal={mealsOrdered.get(mealId).meal}
          quantity={mealsOrdered.get(mealId).quantity}
          handleRemove={() => {
            removeMealFromOrder(mealId);
          }}
        />
      ))}
    </>
  );

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
        <Badge badgeContent={totalMeals} color="secondary">
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
          {totalMeals ? cartWithItems : emptyCart}
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
  createPaymentIntent,
  store,
})(Cart);
