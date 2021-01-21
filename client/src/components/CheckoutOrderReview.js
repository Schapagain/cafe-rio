import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

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

const CheckoutOrderReview = ({ order }) => {
  const classes = useStyles();
  useEffect(() => {
    console.log(order);
  });
  const handleRemove = () => {};
  return (
    <Paper>
      {order.map((meal, index) => (
        <Grid container key={index} className={classes.root}>
          <Grid container item xs={10}>
            <Grid item xs={12}>
              <Typography variant="h6" className={classes.mealName}>
                {meal.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Link component="button" variant="body2" onClick={handleRemove}>
                Remove
              </Link>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1">${meal.price}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      ))}
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  order: state.order.order,
  meals: state.meal.meals,
});
export default connect(mapStateToProps)(CheckoutOrderReview);
