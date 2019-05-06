import React, { Component } from 'react';
import { Route, Switch} from "react-router-dom";
import Register from './Containers/Register'
import Login from './Containers/Login'
import Home from './Containers/Home'
import Quotes from './Containers/Quotes'
import StylePage from './Containers/StylePage'
import StyleContainer from './Containers/StyleContainer'
import QuotePage from './Containers/QuotePage'
import QuoteShowPage from './Containers/QuoteShowPage'
import AllQuotes from './Containers/AllQuotes-Admin'
import EditQuotePage from "./Containers/EditQuotePage";
import './App.css'

const API_URL = 'http://localhost:3000/api/v1';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/register" render={() => <Register apiUrl={API_URL} />} />
        <Route path="/login" render={() => <Login apiUrl={API_URL} />} />
        <Route path="/new_quote/style/:id" render={() => <StylePage apiUrl={API_URL}/>}/>
        <Route path="/new_quote/selected" render={() => <QuotePage apiUrl={API_URL}/>}/>
        <Route path="/new_quote" render={() => <StyleContainer apiUrl={API_URL}/>} />
        <Route path="/all_quotes" render={() => <AllQuotes apiUrl={API_URL}/>}/>
        <Route path="/quotes/:id/edit" render={() => <EditQuotePage apiUrl={API_URL}/>}/>
        <Route path="/quotes/:id" render={() => <QuoteShowPage apiUrl={API_URL}/>}/>
        <Route path="/quotes" render={() => <Quotes apiUrl={API_URL}/>} />
        <Route path="/" render={() => <Home apiUrl={API_URL}/>}/>
      </Switch>
    )
  }
}

export default App;
