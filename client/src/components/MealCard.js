import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { makeStyles, useTheme } from "@material-ui/styles";

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
    height: "100%",
    // paddingTop: "56.25%",
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
    fontSize: "0.6rem",
  },
  priceText: {
    lineHeight: "1em",
  },
  foodName: {
    ...theme.typography,
    fontSize: "0.8rem",
  },
  foodPrice: {
    fontSize: "0.7rem",
    lineHeight: ".9rem",
  },
}));

const MealCard = () => {
  const classes = useStyles();
  // const theme = useTheme();
  return (
    <Card className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={5} sm={12}>
          <CardMedia
            component="img"
            alt="Cheese Burger"
            image="https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg"
            className={classes.media}
          />
        </Grid>
        <Grid container item xs={7} sm={12}>
          <Grid item sm={12}>
            <CardContent className={classes.content}>
              <Typography variant="subtitle2" className={classes.foodName}>
                CHEESE BURGER
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                className={classes.foodPrice}
              >
                $3.19
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

export default MealCard;
