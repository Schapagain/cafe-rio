import React, { Fragment, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";

import OrderCard from "./OrderCard";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  shoppingCart: {
    color: "white",
  },
  yourOrderContainer: {
    alignSelf: "flex-start",
  },
  yourOrder: {
    paddingLeft: ".5rem",
    fontSize: "1.5rem",
    fontWeight: "bolder",
  },
}));

const OrderDrawer = () => {
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [orderCount, setOrderCount] = useState(1);

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
        <Grid container direction="column" alignItems="center" spacing={1}>
          <Grid item xs={12} className={classes.yourOrderContainer}>
            <Typography className={classes.yourOrder}>Your Order</Typography>
          </Grid>
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </Grid>
      </Drawer>
    </Fragment>
  );
};

export default OrderDrawer;
