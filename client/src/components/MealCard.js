import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "8px",
    width: 240,
    maxWidth: 345,
    minHeight: 280,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // height: 300,
  },
  media: {
    height: 0,
    paddingTop: "70%",
  },
  content: {
    padding: "4px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  actions: {
    display: "flex",
    justifyContent: "center",

    padding: "0 8px 8px 8px",
  },
}));

const MealCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div>
        <CardMedia
          image="https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg"
          className={classes.media}
          title="Cheese Burger"
        />
        <CardContent className={classes.content}>
          <Typography variant="h6">Cheese Burger</Typography>
          <Typography variant="subtitle1">$3.19</Typography>
        </CardContent>
      </div>
      <CardActions className={classes.actions}>
        <Button
          startIcon={<AddShoppingCartIcon />}
          aria-label="order button"
          variant="contained"
          color="secondary"
          size="medium"
        >
          ADD TO ORDER
        </Button>
      </CardActions>
    </Card>
  );
};

export default MealCard;
