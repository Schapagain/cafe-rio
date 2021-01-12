import React, { useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import Checkout from "./components/Checkout";
import store from "./store";
import { loadUser } from "./actions/authActions";
import theme from "./components/Theme";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Switch>
          <Route path="/login">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          {/* <PrivateRoute path="/">
            <HomePage />
          </PrivateRoute> */}
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
