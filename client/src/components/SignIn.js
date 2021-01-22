import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory, Link as RouterLink } from "react-router-dom";

import { signIn } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = ({ signIn, error, signUpSuccess, checkoutFail, isAuthenticated, clearErrors }) => {
  const classes = useStyles();
  // state to hold input fields data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // error msg state
  const [msg, setMsg] = useState("");
  const [errorFlag, setErrorFlag] = useState("ERROR");

  useEffect(() => {
    if (checkoutFail) {
      setErrorFlag("WARNING");
      setMsg("You must login before checking out!")
    }
    if(signUpSuccess) {
      setErrorFlag("SUCCESS");
      setMsg("Signed up successfully! An activation link has been sent via email.");
    }
    if (error.id === "LOGIN_FAIL") {
      setErrorFlag("ERROR");
      setMsg(error.msg);
    }
  }, [error,signUpSuccess,checkoutFail]);


  // redirect if authenticated
  let history = useHistory();
  useEffect(() => {
    if (isAuthenticated) {
      clearErrors();
      checkoutFail ? history.push("/checkout") : history.push("/");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      email,
      password,
    };
    signIn(newUser);
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {msg !== "" ? <Alert severity={errorFlag.toLowerCase()}>{msg}</Alert> : null}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { signIn, clearErrors })(SignIn);

SignIn.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};
