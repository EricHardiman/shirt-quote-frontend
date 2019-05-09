import React, { Component, Fragment } from "react";
import { withRouter, Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import UserQuotesList from "../components/UserQuotesList";
import { Card } from "semantic-ui-react";
const JWT = require("jsonwebtoken");

class Quotes extends Component {
  state = {
    quotes: []
  };

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      return <Redirect to="/" />;
    } else {
      window.scrollTo(0, 0);
      const userId = JWT.verify(localStorage.getItem("token"), "secret")
        .user_id;
      const token = localStorage.getItem("token");
      fetch(`${this.props.apiUrl}/my_quotes/${userId}`, {
        headers: {
          authorization: token
        }
      })
        .then(res => res.json())
        .then(data => this.setState({ quotes: data }));
    }
  }

  render() {
    const username = JWT.verify(localStorage.getItem("token"), "secret")
      .username;
    return (
      <Fragment>
        <Navbar />
        <h1>{username}'s Current Quotes</h1>
        <Card.Group itemsPerRow={6}>
          <UserQuotesList quotes={this.state.quotes} />
        </Card.Group>
      </Fragment>
    );
  }
}

export default withRouter(Quotes);
