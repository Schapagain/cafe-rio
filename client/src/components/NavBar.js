import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router";
import { Link as RouterLink } from "react-router-dom";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

// setting up how the AppBar behaves when scrolling
function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

// create Hook to allow component to access styles
const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  button: {
    color: "white",
    marginLeft: "auto",
  },
}));

const NavBar = ({ isAuthenticated, user }) => {
  const classes = useStyles();

  const AuthLinks = () => (
    <Button
      className={classes.button}
      size="large"
      startIcon={<AccountCircle />}
    >
      {user.name}
    </Button>
  );

  const UnauthLinks = () => (
    <Button
      //   color="secondary"
      component={RouterLink}
      to="/login"
      className={classes.button}
      size="large"
      startIcon={<AccountCircle />}
    >
      Login
    </Button>
  );

  return (
    <Fragment>
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">Cafe Rio</Typography>
            {isAuthenticated ? <AuthLinks /> : <UnauthLinks />}
            {/* <Button>Logout</Button> */}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user.user,
});

export default connect(mapStateToProps)(NavBar);
