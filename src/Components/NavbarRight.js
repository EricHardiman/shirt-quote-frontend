import React, { Component, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import { Modal, Button, Menu, Header } from "semantic-ui-react";
import { connect } from "react-redux";

const JWT = require("jsonwebtoken");

class NavbarRight extends Component {
  state = {
    room: [],
    open: false
  };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ open: true });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/v1/chats`, {
      method: "get",
      header: {
        "Content-Type": "application/json",
        accepts: "application/json",
        authorization: token
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ room: data }));
  }

  clickHandler = () => {
    const userId = JWT.verify(localStorage.getItem("token"), "secret").user_id;
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/v1/chats/${this.state.room.id}`, {
      method: "PATCH",
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

  makeRoomHandler = () => {
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

  render() {
    const { open, dimmer } = this.state;
    if (!localStorage.getItem("token")) {
      return (
        <Fragment>
          <div className="item">
            <a className="ui button" href="/register">
              Sign Up
            </a>
          </div>
          <div className="item">
            <a className="ui green button" href="/login">
              Log In
            </a>
          </div>
        </Fragment>
      );
    } else if (this.props.isAdmin && this.props.loggedIn) {
      return (
        <Fragment>
          <div className="ui simple dropdown item">
            <i className="user icon" />
            &nbsp;
            {JWT.verify(localStorage.getItem("token"), "secret").username}{" "}
            <i className="dropdown icon" />
            <div className="menu">
              <Menu.Item href="/all_quotes">All Quotes</Menu.Item>
              <Menu.Item onClick={() => this.makeRoomHandler()}>
                Start Customer Chat
              </Menu.Item>
              <div className="divider" />
              <p className="item" onClick={() => this.props.logout()}>
                Sign Out
              </p>
            </div>
          </div>
        </Fragment>
      );
    } else if (!this.props.isAdmin && this.props.loggedIn) {
      return (
        <Fragment>
          <Modal dimmer={dimmer} open={open} onClose={this.close}>
            <Modal.Header>
              <h2>Get in Contact with Us!</h2>
            </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <h3>Problem with an order, or question about a quote?</h3>
                <h4>Phone Number: 1-800-555-5555</h4>
                <h4>Email: shopquote@shopquote.com</h4>
                <h4>Hours: Monday - Friday: 7:00am - 5:00pm</h4>
                <h4>Address: 11 Broadway, New York, New York 10004</h4>
              </Modal.Description>
            </Modal.Content>
            <Modal.Content extra>
              {this.state.room.user_id ? (
                <h4 style={{ color: "red" }}>
                  Live Chat is urrently, unavailable. Check back in a few
                  minutes.
                </h4>
              ) : (
                <h4>
                  Live Chat Available!{" "}
                  <a
                    style={{ cursor: "pointer", color: "green" }}
                    onClick={this.clickHandler}
                  >
                    <u>Click Here</u>
                  </a>{" "}
                  to start a chat.
                </h4>
              )}
            </Modal.Content>
            <Modal.Actions>
              <Button
                positive
                icon="checkmark"
                labelPosition="right"
                content="Thanks!"
                onClick={this.close}
              />
            </Modal.Actions>
          </Modal>
          <div className="ui simple dropdown item">
            <i className="user icon" />
            &nbsp;
            {JWT.verify(localStorage.getItem("token"), "secret").username}{" "}
            <i className="dropdown icon" />
            <div className="menu">
              <a className="item" href="/quotes">
                My Quotes
              </a>
              <a className="item" href="/new_quote">
                New Quote
              </a>
              <Menu.Item onClick={this.show("inverted")}>Contact</Menu.Item>
              <div className="divider" />
              <p className="item" onClick={() => this.props.logout()}>
                Sign Out
              </p>
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    isAdmin: state.isAdmin
  };
};

export default withRouter(connect(mapStateToProps)(NavbarRight));
