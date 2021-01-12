import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import MealCard from "./MealCard";
import { getMeals } from "../actions/mealActions";
import { addMealToOrder } from "../actions/orderActions";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: "100%",
  },
}));

const Meals = ({ meal, getMeals, addMealToOrder }) => {
  // load meals
  // eslint-disable-next-line
  useEffect(
    () => {
      getMeals();
    },
    // eslint-disable-next-line
    []
  );

  const classes = useStyles();

  const { meals } = meal;
  return (
    // <Container maxWidth="md">
    <Grid
      // justify="center"
      // alignItems="center"
      direction="row"
      container
      spacing={2}
      className={classes.root}
    >
      {meals.map((meal) => (
        <Grid item key={meal.id} xs={12} sm={4}>
          <MealCard
            meal={meal}
            handleOnClick={(meal) => {
              addMealToOrder(meal);
            }}
          />
        </Grid>
      ))}
    </Grid>
    // </Container>
  );
};

Meals.propTypes = {
  getMeals: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  meal: state.meal,
  order: state.order.order,
});

export default connect(mapStateToProps, { getMeals, addMealToOrder })(Meals);
