import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

import { removeMealFromOrder } from "../actions/orderActions";
import CheckoutSingleMeal from "./CheckoutSingleMeal";

import OrderInfo from "./OrderInfo";

const CheckoutOrderReview = ({ order, removeMealFromOrder }) => {
  const mealIds = Array.from(order.meals.keys());
  return (
    <div>
      <h1>Review Your Order</h1>
      <div item xs={12}>
        {mealIds.map((mealId) => (
          <CheckoutSingleMeal
            key={mealId}
            mealName={order.meals.get(mealId).meal.name}
            mealQuantity={order.meals.get(mealId).quantity}
            mealPrice={order.meals.get(mealId).meal.price}
            removeMealFromOrder={removeMealFromOrder}
          />
        ))}
      </div>
      <Grid container item xs={12}>
        <Grid container item xs={10}>
          <Typography variant="h6">Total</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">${order.totalPrice}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  order: state.order.order,
  meals: state.meal.meals,
});
export default connect(mapStateToProps, { removeMealFromOrder })(
  CheckoutOrderReview
);
