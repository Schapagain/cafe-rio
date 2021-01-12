import React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0.5em",
    margin: "0.25em",
  },
  mealNameContainer: {
    padding: 0,
  },
  mealName: {
    fontSize: "1rem",
  },
}));

const OrderCard = ({ meal, handleRemove }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Card className={classes.root}>
        <Grid container justify="flex-start" alignItems="center">
          {/* <Grid item xs={1}>
            <CardContent>
              <Typography variant="button">x1</Typography>
            </CardContent>
          </Grid> */}
          <Grid item xs={10}>
            <Grid container direction="column">
              <Grid item xs={12}>
                <CardContent className={classes.mealNameContainer}>
                  <Typography variant="h6" className={classes.mealName}>
                    {meal.name}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item xs={12}>
                <CardActions>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={handleRemove}
                  >
                    Remove
                  </Link>
                </CardActions>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <CardContent>
              <Typography variant="body1">${meal.price}</Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default OrderCard;
