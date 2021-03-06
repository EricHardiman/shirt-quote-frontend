import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import { ActionCableProvider } from "react-actioncable-provider";
require("dotenv").config();

const JWT = require("jsonwebtoken");

const initialState = {
  selectedShirt: [],
  loggedIn: localStorage.getItem("token") !== null,
  isAdmin:
    localStorage.getItem("token") !== null
      ? JWT.verify(localStorage.getItem("token"), "secret").is_admin
      : false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "select_shirt":
      return { ...state, selectedShirt: action.payload };
    case "logout":
      return { ...state, loggedIn: localStorage.getItem("token") !== null };
    case "login":
      return { ...state, loggedIn: localStorage.getItem("token") !== null };
    case "admin":
      return {
        ...state,
        isAdmin: JWT.verify(localStorage.getItem("token"), "secret").is_admin
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

ReactDOM.render(
  <ActionCableProvider url="ws://localhost:3000/cable">
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ActionCableProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
