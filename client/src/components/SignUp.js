import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Divider from "@material-ui/core/Divider";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory, Link as RouterLink } from "react-router-dom";

import { signUp } from "../actions/authActions";
// import SignIn from "./SignIn";
import { clearErrors } from "../actions/errorActions";

// TODO: show feedback for image upload

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Cafe Rio
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: "none",
  },
}));

const SignUp = ({ signUp, error, clearErrors }) => {
  const classes = useStyles();
  // create state to hold form values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [phone, setPhone] = useState("");
  const [idCard, setIdCard] = useState(null);

  // showing errors if they exist
  let history = useHistory();
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (error.id === "REGISTER_FAIL") setMsg(error.msg);
    if (error.id === "REGISTER_SUCCESS") {
      history.push({
        pathname: "/login",
        state: {signUpSuccess:true}
      });
      clearErrors();
    }
    
  }, [error,history,clearErrors]);

  // posts form data to server
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = new FormData();
    newUser.append("name", name);
    newUser.append("email", email);
    newUser.append("password", password);
    newUser.append("organization", organization);
    newUser.append("employeeId", employeeId);
    newUser.append("phone", phone);
    newUser.append("idCard", idCard);
    //attempt to register user
    signUp(newUser);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {msg !== "" ? <Alert severity="error">{msg}</Alert> : null}
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="organization"
                name="organization"
                variant="outlined"
                required
                fullWidth
                id="organization"
                label="Organization"
                autoFocus
                value={organization}
                onChange={(e) => {
                  setOrganization(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="Employee ID"
                name="employeeId"
                variant="outlined"
                required
                fullWidth
                id="employeeId"
                label="Employee ID"
                autoFocus
                value={employeeId}
                onChange={(e) => {
                  setEmployeeId(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="Phone"
                name="phone"
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                autoFocus
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                className={classes.input}
                id="idCard"
                type="file"
                name="idCard"
                onChange={(e) => {
                  setIdCard(e.target.files[0]);
                }}
                // ref={fileRef}
              />
              <label htmlFor="idCard">
                <Button
                  variant="contained"
                  component="span"
                  color="secondary"
                  startIcon={<PhotoCamera />}
                >
                  Upload Photo of Your Employee ID
                </Button>
              </label>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
  })
};

SignUp.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  signUp: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { signUp, clearErrors })(SignUp);
