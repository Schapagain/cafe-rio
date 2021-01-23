import React from "react";
import { connect } from "react-redux";
import { logOut } from "../actions/authActions";
import PropTypes from "prop-types";
import { MenuItem } from "@material-ui/core";

const Logout = ({ closeMenu, logOut }) => {
  return (
    <MenuItem onClick={()=>{logOut();closeMenu();}}>Log out</MenuItem>
  );
};

export default connect(null, { logOut })(Logout);

Logout.propTypes = {
  logOut: PropTypes.func.isRequired,
};
