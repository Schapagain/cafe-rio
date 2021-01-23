import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SingleMeal from "./SingleMeal";
import { getMeals } from "../actions/mealActions";
import { addMealToOrder } from "../actions/orderActions";
// import Spinner from "./Spinner";
import Skeleton from "@material-ui/lab/Skeleton";

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

  const { meals, isLoading } = meal;
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

      {(isLoading ? Array.from(new Array(6)) : meals).map((meal,index) => (
        <Grid item key={index} xs={12} sm={4}>
        {meal ? ( 
          <SingleMeal
            meal={meal}
            handleOnClick={(meal) => {
              addMealToOrder(meal);
            }}
          />
         ) : (
          <Skeleton animation="wave" variant="rect" width={300} height={200}/>
        )}
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
