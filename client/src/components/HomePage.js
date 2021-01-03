import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const HomePage = () => {
  return (
    <Grid container justify="center">
      <Grid item container justify="center" xs={12}>
        <Typography variant="h2">Best Cafe App</Typography>
      </Grid>
      <Grid item container justify="center" xs={12}>
        <Typography variant="h4">You're now logged in</Typography>
      </Grid>
    </Grid>
  );
};

export default HomePage;
