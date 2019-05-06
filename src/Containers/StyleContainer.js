import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import StyleList from "../Components/StyleList";

class StyleContainer extends Component {
  state = {
    shirts: []
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    if (!localStorage.getItem("token")) {
      return <Redirect to="/" />;
    } else {
      fetch(`${this.props.apiUrl}/styles`)
        .then(res => res.json())
        .then(data => {
          this.setState({ shirts: data });
        });
    }
  }

  render() {
    return (
      <StyleList handleClick={this.handleClick} shirts={this.state.shirts} />
    );
  }
}

export default StyleContainer;
