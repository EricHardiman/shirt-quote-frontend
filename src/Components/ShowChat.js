import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form } from "semantic-ui-react";
import { ActionCableConsumer } from "react-actioncable-provider";
const JWT = require("jsonwebtoken");

export class ShowChat extends Component {
  state = {
    messages: [],
    message: ""
  };

  changeHandler = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  sendMessage = () => {
    const userId = JWT.verify(localStorage.getItem("token"), "secret").user_id;
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json",
        authorization: token
      },
      body: JSON.stringify({
        message: {
          user_id: userId,
          chat_id: this.props.match.params.id,
          content: this.state.message,
          username: JWT.verify(localStorage.getItem("token"), "secret").username
        }
      })
    }).then(this.setState({ message: "" }));
  };

  render() {
    return (
      <div>
        <ActionCableConsumer
          channel={{
            channel: "ChatChannel",
            chat_id: this.props.match.params.id
          }}
          onReceived={data =>
            this.setState({ messages: [...this.state.messages, data] })
          }
        />
        <h1>This is the Admin -> User Chat</h1>
        <Form.Input
          value={this.state.message}
          name="message"
          onChange={this.changeHandler}
        />
        {this.state.messages.map(message => (
          <p key={message.id}>
            {message.username}: {message.content}
          </p>
        ))}
        <Form.Button onClick={this.sendMessage}>Send Message</Form.Button>
      </div>
    );
  }
}

export default withRouter(ShowChat);
