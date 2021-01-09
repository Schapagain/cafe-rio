import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import MealCard from "./MealCard";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: "100%",
  },
}));

const Meals = () => {
  const classes = useStyles();
  const meals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
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
        <Grid item key={meal} xs={12} sm={4}>
          <MealCard />
        </Grid>
      ))}
    </Grid>
    // </Container>
  );
};

export default Meals;
