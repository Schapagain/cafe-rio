import React, { useState, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { signUp } from "../actions/authActions";

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

const SignUp = ({ signUp }) => {
  // create state to hold form values
  const [name, setName] = useState("Jay Jay");
  const [email, setEmail] = useState("jay@gmail.com");
  const [password, setPassword] = useState("pass1234");
  const [organization, setOrganization] = useState("Colgate University");
  const [employeeId, setEmployeeId] = useState("00000000");
  const [phone, setPhone] = useState("5555555555");
  const [idCard, setIdCard] = useState(null);

  const classes = useStyles();

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(fileRef.current.files);
    // const files = fileRef.current.files;
    const newUser = new FormData();
    newUser.append("name", name);
    newUser.append("email", email);
    newUser.append("password", password);
    newUser.append("organization", organization);
    newUser.append("employeeId", employeeId);
    newUser.append("phone", phone);
    newUser.append("idCard", idCard);
    for (let key of newUser.entries()) {
      console.log(key[0], key[1]);
    }
    // const newUser = {
    //   name,
    //   email,
    //   password,
    //   organization,
    //   employeeId,
    //   phone,
    //   idCard,
    // };
    // //attempt to register user
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
              <Link href="#" variant="body2">
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

SignUp.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  signUp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { signUp })(SignUp);
