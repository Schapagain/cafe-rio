import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Logout from "./Logout";
import MealCard from "./MealCard";
import Meals from "./Meals";

const HomePage = () => {
  return (
    <Grid container justify="center" spacing={0}>
      <Grid item container justify="center" xs={12}>
        <Typography variant="h5">Today's Menu</Typography>
      </Grid>
      <Grid item xs={12}>
        <Meals />
      </Grid>
      <Grid>
        <Logout />
      </Grid>
    </Grid>
  );
};

export default HomePage;
