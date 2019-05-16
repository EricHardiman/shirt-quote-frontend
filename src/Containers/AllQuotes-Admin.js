import React, { Fragment, Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import AllQuotesList from "../components/AllQuotesList-Admin";
import { Card } from "semantic-ui-react";

class AllQuotes extends Component {
  state = {
    allQuotes: []
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.props.isAdmin) {
      return null;
    } else {
      fetch(`${this.props.apiUrl}/all_quotes`)
        .then(res => res.json())
        .then(data => this.setState({ allQuotes: data }));
    }
  }

  render() {
    if (!this.props.isAdmin) {
      return <Redirect to={"/"} />;
    } else if (this.props.isAdmin) {
      return (
        <Fragment>
          <Navbar />
          <h1 style={{}}>All Customer's Quotes</h1>
          <Card.Group itemsPerRow={6}>
            <AllQuotesList quotes={this.state.allQuotes} />
          </Card.Group>
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isAdmin: state.isAdmin,
    loggedIn: state.loggedIn
  };
};

export default connect(mapStateToProps)(AllQuotes);
