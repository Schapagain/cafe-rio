import React from "react";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";

import store from "./store";
import { loadUser } from "./actions/authActions";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Provider store={store}>
      <h1>Cafe App</h1>
      {/* <SignUp /> */}
      <HomePage />
    </Provider>
  );
}

export default App;
