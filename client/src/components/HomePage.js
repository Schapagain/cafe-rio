import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Logout from "./Logout";
import MealCard from "./MealCard";
import Meals from "./Meals";

const useStyles = makeStyles((theme) => ({
  todaysMenu: {
    // backgroundColor: theme.palette.secondary.light,
    marginTop: ".8rem",
  },
  todaysMenuText: {
    fontSize: "1rem",
    fontWeight: "bolder",

    // color: theme.palette.main,
  },
}));

const HomePage = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Grid container justify="center" spacing={2}>
        <Grid item container className={classes.todaysMenu}>
          <Typography variant="h5" className={classes.todaysMenuText}>
            TODAY'S MENU
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Meals />
        </Grid>
        <Grid>
          <Logout />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
