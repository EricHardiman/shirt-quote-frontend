import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Register from "./containers/Register";
import Login from "./containers/Login";
import Home from "./containers/Home";
import Quotes from "./containers/Quotes";
import StylePage from "./containers/StylePage";
import StyleContainer from "./containers/StyleContainer";
import QuoteShowPage from "./containers/QuoteShowPage";
import EditQuotePage from "./containers/EditQuotePage";
import AllQuotes from "./containers/AllQuotes-Admin";
import MakeChat from "./components/MakeChat-Admin";
import ShowChat from "./components/ShowChat";
import "./App.css";

const API_URL = "http://localhost:3000/api/v1";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/register" render={() => <Register apiUrl={API_URL} />} />
        <Route path="/login" render={() => <Login apiUrl={API_URL} />} />
        <Route
          path="/new_quote/style/:id"
          render={() => <StylePage apiUrl={API_URL} />}
        />
        <Route
          path="/new_quote"
          render={() => <StyleContainer apiUrl={API_URL} />}
        />
        <Route
          path="/all_quotes"
          render={() => <AllQuotes apiUrl={API_URL} />}
        />
        <Route
          path="/quotes/:id/edit"
          render={() => <EditQuotePage apiUrl={API_URL} />}
        />
        <Route
          path="/quotes/:id"
          render={() => <QuoteShowPage apiUrl={API_URL} />}
        />
        <Route path="/chats/:id" render={() => <ShowChat apiUrl={API_URL} />} />
        <Route
          path="/create_chat"
          render={() => <MakeChat apiUrl={API_URL} />}
        />
        <Route path="/quotes" render={() => <Quotes apiUrl={API_URL} />} />
        <Route path="/" render={() => <Home apiUrl={API_URL} />} />
      </Switch>
    );
  }
}

export default App;
