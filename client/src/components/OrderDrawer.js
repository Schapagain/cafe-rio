import React, { Fragment, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import OrderCard from "./OrderCard";
import { Typography } from "@material-ui/core";
import { addMealToOrder, removeMealFromOrder } from "../actions/orderActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "20em",
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

const OrderDrawer = ({ order, meals, addMealToOrder, removeMealFromOrder }) => {
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [orderCount, setOrderCount] = useState(1);

  useEffect(() => {
    console.log(order);
    console.log(meals);
  });

  const toggleDrawer = (open) => {
    setOpenDrawer(open);
  };

  return (
    <Fragment>
      <IconButton
        className={classes.shoppingCart}
        aria-label="open shopping cart"
        onClick={() => {
          setOpenDrawer(!openDrawer);
        }}
        disableRipple
        disableFocusRipple
      >
        <Badge badgeContent={orderCount} color="secondary">
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
            >
              <Typography variant="button" className={classes.checkoutText}>
                CHECKOUT
              </Typography>
              <Typography variant="subtitle2" className={classes.subPriceText}>
                $45.96
              </Typography>
            </Button>
          </Grid>
          {}
          <OrderCard />
          {/*<OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard /> */}
        </Grid>
      </Drawer>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  order: state.order.order,
  meals: state.meal.meals,
});

export default connect(mapStateToProps, {
  addMealToOrder,
  removeMealFromOrder,
})(OrderDrawer);
