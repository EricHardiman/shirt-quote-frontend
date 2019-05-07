import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import StyleList from "../components/StyleList";
import Sidebar from "../components/Sidebar";

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
      <Fragment>
        <StyleList handleClick={this.handleClick} shirts={this.state.shirts} />
        <Sidebar />
      </Fragment>
    );
  }
}

export default StyleContainer;
