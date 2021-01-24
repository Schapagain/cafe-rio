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
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory, Link as RouterLink } from "react-router-dom";
import Spinner from "./Spinner";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import { signUp } from "../actions/authActions";
import IdUpload from "./IdUpload";
import { clearErrors } from "../actions/errorActions";
import Copyright from "./Copyright";

// TODO: show feedback for image upload

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
  signin: {
    marginTop: theme.spacing(1),
  },
  image: {
    width: "100%",
  },
}));

function getSteps() {
  return [
    "Input Your Information",
    "Upload a Photo of Your Employee ID",
    "Confirm Your Information",
  ];
}

const SignUp = ({ signUp, error, isLoading, clearErrors }) => {
  const classes = useStyles();
  // create state to hold form values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [phone, setPhone] = useState("");
  const [idCard, setIdCard] = useState(null);
  const [nextDisabled, setNextDisabled] = useState(true);
  // state for what step of sign up we're at
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  // showing errors if they exist
  let history = useHistory();
  const [msg, setMsg] = useState("");
  useEffect(() => {
    console.log(nextDisabled);
    console.log(name);
    console.log();
    checkDisabled();
  });
  useEffect(() => {
    if (error.id === "REGISTER_FAIL") setMsg(error.msg);
    if (error.id === "REGISTER_SUCCESS") {
      history.push({
        pathname: "/login",
        state: { signUpSuccess: true },
      });
      clearErrors();
    }
  }, [error, history, clearErrors]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

  const PreviewForm = () => (
    <Grid item xs={12}>
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
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            InputProps={{
              readOnly: true,
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
            InputProps={{
              readOnly: true,
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
            InputProps={{
              readOnly: true,
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
            value={organization}
            onChange={(e) => {
              setOrganization(e.target.value);
            }}
            InputProps={{
              readOnly: true,
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
            value={employeeId}
            onChange={(e) => {
              setEmployeeId(e.target.value);
            }}
            InputProps={{
              readOnly: true,
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
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );

  const checkDisabled = () => {
    if (activeStep === 0) {
      const fields = [name, email, password, organization, employeeId, phone];
      const nextDisabled = fields.reduce(
        (disabled, field) => Boolean(field) && disabled
      );
      setNextDisabled(!nextDisabled);
    } else if (activeStep === 1) {
      setNextDisabled(!idCard);
    }
  };

  const SignUpButtons = () => (
    <Grid container justify="space-between">
      <Button
        disabled={activeStep === 0}
        onClick={handleBack}
        className={classes.button}
      >
        Back
      </Button>
      {activeStep !== steps.length - 1 ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
          disabled={nextDisabled}
        >
          Next
        </Button>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Sign Up
          </Button>
        </>
      )}
      <Grid container justify="flex-end" className={classes.signin}>
        <Grid item>
          <Link component={RouterLink} to="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );

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

        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {msg !== "" ? <Alert severity="error">{msg.msg}</Alert> : null}
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              Thank you for signing up! We have sent an activation code to your
              email. Please activate your account and then click below to sign
              in
            </Typography>
            <Button>Sign In</Button>
          </div>
        ) : (
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2} justify="center">
              <Grid item xs={12}>
                {activeStep === 0 ? (
                  <Grid item xs={12}>
                    <Grid container spacing={2} justify="center">
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
                    </Grid>
                  </Grid>
                ) : activeStep === 1 ? (
                  <IdUpload setIdCard={setIdCard} />
                ) : (
                  <Grid container justify="center">
                    <Grid item xs={12}>
                      <img
                        src={URL.createObjectURL(idCard)}
                        alt="employment id card"
                        className={classes.image}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <PreviewForm />
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <SignUpButtons />
              </Grid>
            </Grid>
          </form>
        )}
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
  };
};

SignUp.propTypes = {
  isLoading: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  signUp: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { signUp, clearErrors })(SignUp);
