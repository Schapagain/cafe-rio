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
    width: "20em",
    padding: "0.5em",
    margin: "0.25em",
  },
  mealNameContainer: {
    padding: 0,
  },
}));

const OrderCard = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Card className={classes.root}>
        <Grid container justify="flex-start" alignItems="center">
          <Grid item xs={1}>
            <CardContent>
              <Typography variant="subtitle2">x2</Typography>
            </CardContent>
          </Grid>
          <Grid item xs={9}>
            <Grid container direction="column">
              <Grid item xs={12}>
                <CardContent classes={classes.mealNameContainer} id="ddd">
                  <Typography variant="h6">Apple Pie</Typography>
                </CardContent>
              </Grid>
              <Grid item xs={12}>
                <CardActions>
                  <Link component="button" variant="body2">
                    Remove
                  </Link>
                </CardActions>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <CardContent>
              <Typography variant="body1">$9.19</Typography>
            </CardContent>{" "}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default OrderCard;
