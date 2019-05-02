import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import Navbar from "./Navbar";
import UserQuotesList from "../Components/UserQuotesList"
const JWT = require('jsonwebtoken');

class Quotes extends Component {

  state = {
    quotes: []
  }

  componentDidMount() {
    if (!localStorage.getItem("token")){
      return <Redirect to='/'/>
    } else {
      window.scrollTo(0, 0)
      const userId = JWT.verify(localStorage.getItem("token"), 'secret').user_id
      const token = localStorage.getItem("token")
      fetch(`${this.props.apiUrl}/my_quotes/${userId}`, {
        headers: {
          authorization: token
        }
      })
        .then(res => res.json())
        .then(data => this.setState({quotes: data}))
    }
  }

  render() {
    return (
      <Fragment>
        <Navbar />
          <h1>Your Current Quotes</h1>
          <UserQuotesList quotes={this.state.quotes}/>
      </Fragment>
    );
  }
}

export default withRouter(Quotes)
