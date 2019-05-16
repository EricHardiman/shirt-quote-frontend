import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Form, Comment, Header } from "semantic-ui-react";
import { ActionCableConsumer } from "react-actioncable-provider";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../containers/Navbar";
const JWT = require("jsonwebtoken");

export class ShowChat extends Component {
  state = {
    room: [],
    messages: [],
    message: "",
    matchingUser: true
  };

  changeHandler = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  updateScroll = () => {
    let chat = document.getElementById("chat-box");
    chat.scrollTop = chat.scrollHeight;
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const userId = JWT.verify(localStorage.getItem("token"), "secret").user_id;
    fetch(
      `http://localhost:3000/api/v1/find_chat/${this.props.match.params.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          accepts: "application/json",
          authorization: token
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        data.user_id === userId || this.props.isAdmin
          ? this.setState({ room: data })
          : this.setState({ matchingUser: false });
      });
  }

  render() {
    const sendMessage = () => {
      const token = localStorage.getItem("token");
      const userId = JWT.verify(localStorage.getItem("token"), "secret")
        .user_id;

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
            username: JWT.verify(localStorage.getItem("token"), "secret")
              .username
          }
        })
      }).then(this.setState({ message: "" }));
    };
    if (this.state.matchingUser) {
      return (
        <Fragment>
          <Navbar />
          <ActionCableConsumer
            channel={{
              channel: "ChatChannel",
              chat_id: this.props.match.params.id
            }}
            onReceived={data =>
              this.setState({ messages: [...this.state.messages, data] }, () =>
                this.updateScroll()
              )
            }
          />
          <div>
            <h1
              style={{
                textAlign: "center",
                paddingTop: "10em",
                marginBottom: "-13em"
              }}
            >
              Online Chat
            </h1>
            <div className="chatbox" id="chat-box">
              <Comment.Group>
                <div
                  style={{ bottom: "10em" }}
                  className="chat-container"
                  id="chat-box"
                >
                  {this.state.messages.map(message => (
                    <Comment>
                      <Comment.Avatar
                        src={
                          message.username === "Admin"
                            ? "https://www.planet.com.bd/wp-content/uploads/2018/11/male-gravatar-compressor.png"
                            : "https://react.semantic-ui.com/images/avatar/small/matt.jpg"
                        }
                      />
                      <Comment.Content>
                        <Comment.Author>{message.username}</Comment.Author>
                        <Comment.Text>{message.content}</Comment.Text>
                      </Comment.Content>
                    </Comment>
                  ))}
                </div>
              </Comment.Group>
            </div>
          </div>
          <div className="input-chat">
            <Form
              reply
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: 50
              }}
            >
              <Form.Input
                action={{
                  color: "blue",
                  onClick: e => {
                    sendMessage();
                  },
                  labelPosition: "right",
                  icon: "edit",
                  content: "Send Message"
                }}
                actionPosition="right"
                placeholder="Type your message here..."
                value={this.state.message}
                name="message"
                onChange={this.changeHandler}
              />
            </Form>
          </div>
        </Fragment>
      );
    } else {
      return <Redirect to="/contact" />;
    }
  }
}
const mapStateToProps = state => {
  return {
    isAdmin: state.isAdmin
  };
};

export default withRouter(connect(mapStateToProps)(ShowChat));
