import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Navbar from "../containers/Navbar";
const JWT = require("jsonwebtoken");

export class MakeChat extends Component {
  state = {
    rooms: []
  };

  clickHandler = () => {
    const userId = JWT.verify(localStorage.getItem("token"), "secret").user_id;
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/v1/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json",
        authorization: token
      },
      body: JSON.stringify({
        user_id: userId
      })
    })
      .then(res => res.json())
      .then(data => this.props.history.push(`/chats/${data.id}`));
  };

  roomHandler = room => {
    this.props.history.push(`/chats/${room.id}`);
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
    console.log(this.state.rooms);
    return (
      <div>
        <Navbar />
        <Button onClick={this.clickHandler}>Cute as a Button</Button>
        {this.state.rooms.map(room => (
          <h1 onClick={() => this.roomHandler(room)}>Join this room</h1>
        ))}
      </div>
    );
  }
}
export default withRouter(MakeChat);
