import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import StyleList from "../components/StyleList";
import Sidebar from "../components/Sidebar";

class StyleContainer extends Component {
  state = {
    shirts: [],
    forFilter: []
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    if (!localStorage.getItem("token")) {
      return <Redirect to="/" />;
    } else {
      fetch(`${this.props.apiUrl}/styles`)
        .then(res => res.json())
        .then(data => {
          this.setState({ shirts: data, forFilter: data });
        });
    }
  }

  manufactureFilter = value => {
    const filtered = this.state.shirts.filter(
      shirt => shirt.manufacture.name === value
    );
    if (filtered.length === 0) {
      this.setState(prevState => ({
        forFilter: prevState.forFilter
      }));
    } else {
      this.setState({ forFilter: filtered });
    }
  };

  styleFilter = value => {
    const filtered = this.state.shirts.filter(shirt =>
      shirt.category.includes(value)
    );
    if (filtered.length === 0) {
      this.setState(prevState => ({
        forFilter: prevState.forFilter
      }));
    } else {
      this.setState({ forFilter: filtered });
    }
  };

  sizeFilter = value => {
    const filtered = this.state.shirts.filter(shirt =>
      shirt.size.includes(value)
    );
    if (filtered.length === 0) {
      this.setState(prevState => ({
        forFilter: prevState.forFilter
      }));
    } else {
      this.setState({ forFilter: filtered });
    }
  };

  genderFilter = value => {
    const filtered = this.state.shirts.filter(shirt =>
      shirt.gender.includes(value)
    );
    if (filtered.length === 0) {
      this.setState(prevState => ({
        forFilter: prevState.forFilter
      }));
    } else {
      this.setState({ forFilter: filtered });
    }
  };

  ageFilter = value => {
    const filtered = this.state.shirts.filter(shirt =>
      shirt.age_group.includes(value)
    );
    if (filtered.length === 0) {
      this.setState(prevState => ({
        forFilter: prevState.forFilter
      }));
    } else {
      this.setState({ forFilter: filtered });
    }
  };

  render() {
    return (
      <Fragment>
        <StyleList
          handleClick={this.handleClick}
          shirts={this.state.forFilter}
        />
        <Sidebar
          manufacture={this.manufactureFilter}
          style={this.styleFilter}
          size={this.sizeFilter}
          gender={this.genderFilter}
          age={this.ageFilter}
        />
      </Fragment>
    );
  }
}

export default StyleContainer;
