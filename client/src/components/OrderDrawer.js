import React, { Fragment, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";

import OrderCard from "./OrderCard";

const useStyles = makeStyles((theme) => ({
  shoppingCart: {
    color: "white",
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
        <OrderCard />
      </Drawer>
    </Fragment>
  );
};

export default OrderDrawer;
