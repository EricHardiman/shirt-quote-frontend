import React, { Component } from 'react';
import { Route, Switch} from "react-router-dom";
import Register from './Containers/Register'
import Login from './Containers/Login'
import Home from './Containers/Home'
import Quotes from './Components/Quotes'
import StylePage from './Containers/StylePage'
import StyleContainer from './Containers/StyleContainer'
import './App.css'

const API_URL = 'http://localhost:3000/api/v1';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/register" render={() => <Register apiUrl={API_URL} />} />
        <Route path="/login" render={() => <Login apiUrl={API_URL} />} />
        <Route path="/new_quote/style/:id" render={() => <StylePage apiUrl={API_URL}/>}/>
        <Route path="/new_quote" render={() => <StyleContainer apiUrl={API_URL}/>} />
        <Route path="/quotes" render={() => <Quotes apiUrl={API_URL}/>} />
        <Route path="/" render={() => <Home apiUrl={API_URL}/>}/>
      </Switch>
    )
  }
}

export default App;
