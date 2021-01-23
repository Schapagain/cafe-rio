import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Cart from "./Cart";
import PropTypes from "prop-types";
import Fade from '@material-ui/core/Fade';
import Logout from "./Logout";
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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const hanldeOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let history = useHistory();
  const handleLogin = () => {
    console.log('redirecting..')
    history.push("/login");
    handleClose();
  }

  return (
    <Fragment>
      <ElevationScroll>
        <AppBar>
            <Toolbar>
            <Button
              component={Link}
              to="/"
              color="inherit"
              disableFocusRipple
              disableTouchRipple
              disableRipple
            >
              <Typography variant="h6">Café Río</Typography>
            </Button>
            <Button
              onClick={hanldeOpenMenu}
              className={classes.button}
              size="large"
              startIcon={<AccountCircle />}
              aria-controls={isAuthenticated? "auth-menu" : "guest-menu"}
              aria-haspopup="true"
            >
            </Button>
              {isAuthenticated && user.name}
            <Cart />
          </Toolbar>
          
        </AppBar>
      </ElevationScroll>
      <Menu
        id="auth-menu"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        open={isAuthenticated && open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <Logout closeMenu={handleClose}/>
      </Menu>

      <Menu
        id="guest-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!isAuthenticated && open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
          <MenuItem onClick={handleLogin}>Login</MenuItem>
      </Menu>
      <div className={classes.toolbarMargin} />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

export default connect(mapStateToProps,{})(NavBar);

