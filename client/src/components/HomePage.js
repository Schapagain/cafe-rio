import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Meals from "./Meals";
import { connect } from "react-redux";
import { getMeals } from '../actions/mealActions';

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

const HomePage = ({getMeals}) => {

  useEffect(() => {
    getMeals();
  })

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
        <Meals filter="Hot Drinks"/>
        <Meals filter="Cold Drinks"/>
        <Meals filter="Pastries" />
        <Meals filter="Starters" />
        <Meals filter="Entrees" />
        </Grid>
      </Grid>
    </Container>
  );
};

HomePage.propTypes = {
  getMeals: PropTypes.func.isRequired
};

export default connect(null, { getMeals })(HomePage);
