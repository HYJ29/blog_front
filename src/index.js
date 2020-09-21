import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./normalize.css";
import "./index.css";
import dotenv from "dotenv";

import App from "./App";
import configureStore from "data/configureStore";
dotenv.config();

const { history, store } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
