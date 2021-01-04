import React, { Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import PropTypes from "prop-types";
import Link from "@material-ui/core/Link";

const Logout = ({ logout }) => {
  return (
    <Fragment>
      <Link href="#" onClick={logout} variant="body2">
        Click to Test Logout
      </Link>
    </Fragment>
  );
};

export default connect(null, { logout })(Logout);

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};
