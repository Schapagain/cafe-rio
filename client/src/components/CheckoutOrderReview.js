import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import { removeMealFromOrder } from "../actions/orderActions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0.5em",
    margin: "0.25em",
  },
  mealNameContainer: {
    padding: 0,
  },
  mealName: {
    fontSize: "1rem",
  },
}));

const CheckoutOrderReview = ({ order, removeMealFromOrder }) => {
  const classes = useStyles();
  useEffect(() => {
    console.log(order);
  });
  return (
    <div>
      {[...order.values()].map( mealItem => (
        <Grid container key={mealItem[0].id} className={classes.root}>
          <Grid container item xs={10}>
            <Grid item xs={12}>
              <Typography variant="h6" className={classes.mealName}>
                {mealItem[0].name} {mealItem[1] > 1 && `(x${mealItem[1]})`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  removeMealFromOrder(mealItem[0].id);
                }}
              >
                Remove
              </Link>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1">${mealItem[0].price * mealItem[1]}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      ))}
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
