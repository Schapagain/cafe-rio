import React, { Fragment } from "react";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const OrderDrawer = () => {
  return (
    <Fragment>
      <IconButton color="secondary" aria-label="open shopping cart">
        <ShoppingCartIcon />{" "}
      </IconButton>
    </Fragment>
  );
};
