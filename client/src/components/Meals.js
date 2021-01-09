import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import MealCard from "./MealCard";
import { getMeals } from "../actions/mealActions";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: "100%",
  },
}));

const Meals = ({ meal, getMeals }) => {
  // load meals
  useEffect(() => {
    console.log(meal);
    getMeals();
  }, []);

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
          <MealCard meal={meal} />
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
});

export default connect(mapStateToProps, { getMeals })(Meals);
