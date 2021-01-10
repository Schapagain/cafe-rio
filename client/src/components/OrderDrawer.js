import React, { Fragment, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  shoppingCart: {
    color: "white",
  },
}));

const OrderDrawer = () => {
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);

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
        <ShoppingCartIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
        dd
      </Drawer>
    </Fragment>
  );
};

export default OrderDrawer;
