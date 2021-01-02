import React from "react";
import { Provider } from "react-redux";

import store from "./store";
import { loadUser } from "./actions/authActions";

function App() {
  return (
    <Provider store={store}>
      <div className="App">Cafe App</div>
    </Provider>
  );
}

export default App;
