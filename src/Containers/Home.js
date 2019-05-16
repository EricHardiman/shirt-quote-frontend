import React, { Component, Fragment } from "react";
import Navbar from "./Navbar";
import BackgroundSlideshow from "react-background-slideshow";

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
        <div>
          <BackgroundSlideshow
            images={[
              "https://i.imgur.com/TEHYF6p.png",
              "https://static1.squarespace.com/static/53fe7ed2e4b02e9c3cf70aa2/540a5988e4b02af565ffa98f/540a598be4b0788382adc162/1409964442450/Photo+Sep+05%2C+3+29+43+PM.jpg?format=2500w"
            ]}
          />
        </div>
      </Fragment>
    );
  }
}

export default Home;
