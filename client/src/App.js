import React from "react";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";

import store from "./store";
import { loadUser } from "./actions/authActions";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route path="/login">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <PrivateRoute path="/">
          <HomePage />
        </PrivateRoute>
      </Switch>
    </Provider>
  );
}

export default App;
