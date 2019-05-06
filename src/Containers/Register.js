import React, { Component } from "react";
import { Button, Form, Grid, Message, Segment } from "semantic-ui-react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Register extends Component {
  state = {
    username: "",
    password: ""
  };

  createUser() {
    fetch(`${this.props.apiUrl}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password
        }
      })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          localStorage.removeItem("token");
        } else {
          localStorage.setItem("token", data.token);
          this.setState({ username: data.username }, () =>
            this.props.dispatch({ type: "login" })
          );
        }
      });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.createUser();
  };

  render() {
    if (localStorage.getItem("token") !== null) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-form">
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
          className="login-background"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <h2 className="logo-font login-logo" style={{ color: "white" }}>
              <i className="podcast icon" />
              netcast
            </h2>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  name="username"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <Button color="blue" fluid size="large">
                  Create Account
                </Button>
              </Segment>
            </Form>
            <Message>
              Already have an account? <a href="/login">Login here.</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withRouter(connect()(Register));
