import React, { Component, Fragment } from "react";
import Navbar from "./Navbar";

class Home extends Component {
  state = {
    user: {},
    shirts: {}
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    if (localStorage.getItem("token")) {
      fetch(`${this.props.apiUrl}/profile`, {
        headers: {
          "content-type": "application/json",
          accepts: "application/json",
          authorization: `${localStorage.getItem("token")}`
        }
      })
        .then(response => response.json())
        .then(data => this.setState({ user: data.user }));
    }
    this.fetchShirts();
  }

  fetchShirts() {
    fetch(`${this.props.apiUrl}/styles`)
      .then(res => res.json())
      .then(data => {
        this.setState({ shirts: data });
      });
  }

  render() {
    return (
      <Fragment>
        <Navbar shirts={this.state.shirts} />
      </Fragment>
    );
  }
}

export default Home;
