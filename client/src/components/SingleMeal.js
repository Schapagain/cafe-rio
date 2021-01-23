import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { makeStyles } from "@material-ui/styles";

import { ROOT_ENDPOINT } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      width: "300px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      // width: "100%",
      marginLeft: "1rem",
      marginRight: "1rem",
    },
  },
  media: {
    // height: "15rem",
    paddingTop: "56.25%",
  },
  content: {
    padding: 0,
    paddingTop: "0.5em",
    paddingLeft: "0.5em",
  },
  orderButtonContainer: {
    paddingBottom: "0.5em",
  },
  orderButton: {
    // fontSize: "0.6rem",
  },
  priceText: {
    lineHeight: "1em",
  },
  foodName: {
    ...theme.typography,
    fontSize: "1rem",
  },
  foodPrice: {
    fontSize: "0.9rem",
    lineHeight: ".9rem",
  },
}));

const SingleMeal = ({ meal, handleOnClick }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} id="mealCard">
      <Grid container justify="center" alignItems="center">
        <Grid item xs={5} sm={12}>
          <CardMedia
            // component="img"
            alt={meal.name}
            image={`${ROOT_ENDPOINT}/api/meals/${meal.id}/picture`}
            className={classes.media}
          />
        </Grid>
        <Grid container item xs={7} sm={12}>
          <Grid item sm={12}>
            <CardContent className={classes.content}>
              <Typography variant="subtitle2" className={classes.foodName}>
                {meal.name}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                className={classes.foodPrice}
              >
                {`$${meal.price && Number(meal.price).toFixed(2)}`}
              </Typography>
            </CardContent>
          </Grid>
          <Grid
            item
            sm={12}
            container
            justify="center"
            className={classes.orderButtonContainer}
          >
            <CardActions>
              <Button
                startIcon={<AddShoppingCartIcon />}
                aria-label="order button"
                variant="contained"
                color="secondary"
                size="small"
                className={classes.orderButton}
                onClick={() => {
                  handleOnClick(meal);
                }}
              >
                ADD TO ORDER
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SingleMeal;
