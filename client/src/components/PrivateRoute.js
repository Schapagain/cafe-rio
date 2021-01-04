import React from "react";
import { Route, Redirect } from "react-router-dom";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({ isAuthenticated, ...otherProps }) => {
  return isAuthenticated ? <Route {...otherProps} /> : <Redirect to="/login" />;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);

// PrivateRoute.propTypes = {
//   isAuthenticated: PropTypes.bool.isRequired,
// };
