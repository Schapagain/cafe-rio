import React, { useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import Checkout from "./components/Checkout";
import store from "./store";
import { loadUser } from "./actions/authActions";
import theme from "./components/Theme";

const stripePromise = loadStripe(
  "pk_test_51I8QurI5qzReycR9FSYytJ8iPoxfXFQwYObAZC0x8jXsHY6K6XOCZ8AtF6N8NDiDpPC58I090d88Q0i0Y4PudyZo00AFJEaifB"
);

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={theme}>
            <NavBar />
            <Switch>
              <Route
                exact
                path="/login"
                render={(props) => <SignIn {...props.location.state} />}
              />
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/checkout">
                <Checkout />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </Elements>
    </Provider>
  );
}

export default App;
