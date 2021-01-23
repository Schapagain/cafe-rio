import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { removeMealFromOrder } from "../actions/orderActions";
import CheckoutSingleMeal from "./CheckoutSingleMeal";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0.5em",
  },
  mealNameContainer: {
    padding: 0,
  },
  mealName: {
    fontSize: "1rem",
  },
  review: {
    fontSize: "1.8rem",
  },
}));

const CheckoutOrderReview = ({ order, removeMealFromOrder }) => {
  const classes = useStyles();
  const mealIds = Array.from(order.meals.keys());
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography className={classes.review}>Review Your Order</Typography>
      </Grid>
      <Grid item xs={12}>
        {mealIds.map((mealId) => (
          <CheckoutSingleMeal
            key={mealId}
            mealName={order.meals.get(mealId).meal.name}
            mealQuantity={order.meals.get(mealId).quantity}
            mealPrice={order.meals.get(mealId).meal.price}
            removeMealFromOrder={removeMealFromOrder}
          />
        ))}
      </Grid>
      <Grid container item xs={12}>
        <Grid container item xs={10}>
          <Typography variant="h6">Total</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">${order.totalPrice}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  order: state.order.order,
  meals: state.meal.meals,
});
export default connect(mapStateToProps, { removeMealFromOrder })(
  CheckoutOrderReview
);
