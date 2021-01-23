import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SingleMeal from "./SingleMeal";
import Typography from "@material-ui/core/Typography";
import { addMealToOrder } from "../actions/orderActions";
// import Spinner from "./Spinner";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: "100%",
  },
}));

const Meals = ({ meal, filter, addMealToOrder }) => {
  const classes = useStyles();

  let { meals, isLoading } = meal;
  meals = meals.filter((meal) => meal.category === filter.toLowerCase());
  return (
    // <Container maxWidth="md">
    <>
      <Typography variant="h5" className={classes.todaysMenuText}>
        {filter}
      </Typography>
      <Grid direction="row" container spacing={2} className={classes.root}>
        {(isLoading ? Array.from(new Array(4)) : meals).map((meal, index) => (
          <Grid item key={index} xs={12} sm={4}>
            {meal ? (
              <SingleMeal
                meal={meal}
                handleOnClick={(meal) => {
                  addMealToOrder(meal);
                }}
              />
            ) : (
              <Skeleton
                animation="wave"
                variant="rect"
                width={300}
                height={200}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

Meals.propTypes = {
  meal: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  meal: state.meal,
  order: state.order.order,
});

export default connect(mapStateToProps, { addMealToOrder })(Meals);
