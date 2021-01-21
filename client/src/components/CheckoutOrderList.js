import React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { addMealToOrder, removeMealFromOrder } from "../actions/orderActions";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  meal: {
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

const CheckoutOrderList = ({ order, handleRemove }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        {order.map((meal, index) => (
          <Grid
            container
            justify="flex-start"
            alignItems="center"
            className={classes.meal}
            key={index}
          >
            <Grid item xs={1}>
              <CardContent>
                <Typography variant="button">x1</Typography>
              </CardContent>
            </Grid>
            <Grid item xs={9}>
              <Grid container direction="column">
                <CardContent className={classes.mealNameContainer}>
                  <Typography variant="h6" className={classes.mealName}>
                    {order[0].name}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <CardContent>
                <Typography variant="body1">${order[0].price}</Typography>
              </CardContent>
            </Grid>
            <Grid item xs={1}>
              <CardActions>
                <Link component="button" variant="body2" onClick={handleRemove}>
                  Remove
                </Link>
              </CardActions>
            </Grid>
            <Grid item xs={12}>
              <Divider component="div" />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  order: state.order.order,
  meals: state.meal.meals,
});

export default connect(mapStateToProps, {
  addMealToOrder,
  removeMealFromOrder,
})(CheckoutOrderList);
