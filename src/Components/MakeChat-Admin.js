import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Navbar from "../containers/Navbar";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
const JWT = require("jsonwebtoken");

export class MakeChat extends Component {
  state = {
    rooms: []
  };

  clickHandler = () => {
    const adminId = JWT.verify(localStorage.getItem("token"), "secret").user_id;
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/v1/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json",
        authorization: token
      },
      body: JSON.stringify({
        admin_id: adminId
      })
    })
      .then(res => res.json())
      .then(data => this.props.history.push(`/chats/${data.id}`));
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/v1/chats", {
      method: "get",
      header: {
        "Content-Type": "application/json",
        accepts: "application/json",
        authorization: token
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ rooms: data }));
  }

  render() {
    if (!this.props.isAdmin) {
      return <Redirect to={"/"} />;
    } else if (this.props.isAdmin) {
      return (
        <div>
          <Navbar />
          <Button onClick={this.clickHandler}>Cute as a Button</Button>
          {this.state.rooms.id ? (
            <h1 onClick={this.clickHandler}>Join this Room</h1>
          ) : null}
        </div>
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
export default withRouter(connect(mapStateToProps)(MakeChat));
