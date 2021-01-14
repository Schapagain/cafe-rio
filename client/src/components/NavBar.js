import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Cart from "./Cart";

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
  // const [anchorEl, setAnchorEl] = useState(null);
  // const [open, setOpen] = useState(false);

  // const handleClick = (e) => {
  //   console.log(e.currentTarget);
  //   setAnchorEl(e.currentTarget);
  //   setOpen(true);
  // };

  // const handleClose = (e) => {
  //   setAnchorEl(null);
  //   setOpen(false);
  // };

  const AuthLinks = () => (
    <Fragment>
      <Button
        className={classes.button}
        size="large"
        startIcon={<AccountCircle />}
        aria-controls="profile-menu"
        aria-haspopup="true"
        // onClick={handleClick}
      >
        {user ? user.name : "Why No Name"}
      </Button>
      {/* <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>Payment</MenuItem>
        <MenuItem>Order History</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu> */}
    </Fragment>
  );

  const UnauthLinks = () => (
    <Button
      //   color="secondary"
      component={Link}
      to="/login"
      className={classes.button}
      size="medium"
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
            <Button
              component={Link}
              to="/"
              color="inherit"
              disableFocusRipple
              disableTouchRipple
              disableRipple
            >
              <Typography variant="h6">Cafe Rio</Typography>
            </Button>
            {isAuthenticated ? <AuthLinks /> : <UnauthLinks />}
            <Cart />
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
  user: state.auth.user,
});

export default connect(mapStateToProps)(NavBar);
