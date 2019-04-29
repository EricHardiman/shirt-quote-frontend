import React, { Component } from 'react';
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react';
import { Redirect, withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  createUser() {
    fetch(`${this.props.apiUrl}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
      },
      body: JSON.stringify({ user: this.state })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.message){
          localStorage.removeItem("token");
        }
        else {
          localStorage.setItem("token", data.token);
          this.setState({ username: data.username });
        }
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.createUser();
  }

  render() {
    if (localStorage.getItem("token") !== null) {
      return <Redirect to='/' />
    }
    return (
      <div className='login-form'>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle' className="login-background">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  name="username"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  name="password"
                  type='password'
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <Button color="blue" fluid size='large'>
                  Sign In
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href='/register'>Create an account.</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default withRouter(Login)