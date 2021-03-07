import React, { useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Drawer from "./Drawer";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";

import CartSingleMeal from "./CartSingleMeal";
import emptyCartImage from "../images/empty_cart.png";
import { addMealToOrder, removeMealFromOrder } from "../actions/orderActions";
import { createPaymentIntent } from "../actions/paymentActions";
import { LOAD_CHECKOUT } from "../actions/types";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const Cart = ({ order, className }) => {
  const numItems = order.totalMeals;

  const [cartOpen,setCartOpen] = useState(false);

  return (
    <>
    <div 
    className={`${className} h-full flex text-black hover:text-white hover:bg-theme-color rounded-xl select-none cursor-pointer relative w-full`}>
      <AiOutlineShoppingCart 
      className="m-1 text-4xl inline" 
      onClick = {()=>setCartOpen(!cartOpen)}
      />
      <div 
      className="absolute text-white top-0 right-0 bg-theme-color h-5 w-5 flex items-center text-xs justify-center p-3 rounded-full"
      >
        {numItems || 0}
      </div>
    </div>
    <Drawer toggleDrawer={()=>setCartOpen(!cartOpen)} cartOpen={cartOpen} />
    </>
  )
}

Cart.propTypes = {
  order: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  order: state.order.order
})


export default connect(mapStateToProps, {})(Cart)
