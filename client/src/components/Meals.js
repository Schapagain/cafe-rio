import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

import MealCard from "./MealCard";
import store from "../store";
import { getMeals } from "../actions/mealActions";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: "100%",
  },
}));

const Meals = ({ meals, getMeals }) => {
  const [currentMeals, setCurrentMeals] = useState([]);

  // load meals
  useEffect(() => {
    console.log(meals);
    store.dispatch(getMeals());
    console.log(meals);
    setCurrentMeals(meals);
    console.log(currentMeals);
  }, []);
  const classes = useStyles();
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
      {currentMeals.map((meal) => (
        <Grid item key={meal.id} xs={12} sm={4}>
          <MealCard meal={meal} />
        </Grid>
      ))}
    </Grid>
    // </Container>
  );
};

const mapStateToProps = (state) => ({
  meals: state.meals.meals,
});

export default connect(mapStateToProps, { getMeals })(Meals);
