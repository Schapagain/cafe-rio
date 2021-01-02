import React from "react";
import { Provider } from "react-redux";

import store from "./store";
import { loadUser } from "./actions/authActions";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Provider store={store}>
      <h1>Cafe App</h1>
      <SignUp />
    </Provider>
  );
}

export default App;
