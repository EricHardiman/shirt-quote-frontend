import React, { Component, Fragment } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { withRouter, Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
import Navbar from "./Navbar";

const JWT = require('jsonwebtoken');

class QuotePage extends Component {

  state = {
    full_name: "",
    org_name: "",
    add_one: "",
    add_two: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    email: "",
    sizes: "",
    front: "",
    back: "",
    color: "black",
    status: "Pending",
    user_id: null,
    quote_number: Math.floor(Math.random() * 900000) + 100000,
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.setState({
      user_id: JWT.verify(localStorage.getItem("token"), 'secret').user_id,
      front: this.props.selectedShirt.front,
      back: this.props.selectedShirt.back
    })
  }

  changeHandler = (ev) => {
    this.setState({[ev.target.name]: ev.target.value})
  }

  submitHandler = () => {
    const token = localStorage.getItem("token")
    fetch(`${this.props.apiUrl}/quotes`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json",
        authorization: token
      },
      body: JSON.stringify({
        quote: this.state
      })
    })
      .then(this.props.history.push('/quotes'))
  }

  render() {
    return(
      <Fragment>
        <Navbar/>
        <main style={{ marginLeft: '4em'}}>
          <div className="quote-form">
            <Form onSubmit={this.submitHandler}>
              <Form.Group grouped>
                <Form.Input label='Full Name' width={5} name="full_name" value={this.state.full_name} onChange={this.changeHandler}/>
                <Form.Input label='Organization Name' width={5} name="org_name" value={this.state.org_name} onChange={this.changeHandler}/>
                <Form.Input label='Address 1' width={5} name="add_one" value={this.state.add_one} onChange={this.changeHandler}/>
                <Form.Input label='Address 2' width={5} name="add_two" value={this.state.add_two} onChange={this.changeHandler}/>
                <Form.Input label='City' width={5} name="city" value={this.state.city} onChange={this.changeHandler}/>
                <Form.Input label='State' width={5} name="state" value={this.state.state} onChange={this.changeHandler}/>
                <Form.Input label='Zip Code' width={5} name="zipcode" value={this.state.zipcode} onChange={this.changeHandler}/>
                <Form.Input label='Country' width={5} name="country" value={this.state.country} onChange={this.changeHandler}/>
                <Form.Input type="email" label='Email Address' width={5} name="email" value={this.state.email} onChange={this.changeHandler}/>
                  <Form.TextArea
                    label="Sizes"
                    placeholder="Please list all sizes and quantities needed! Adult and Youth sizes are available in most styles!  Additional fees may apply to sizes 2XL and up."
                    name="sizes"
                    width={6}
                    value={this.state.sizes}
                    onChange={this.changeHandler}
                  />
                  <Form.TextArea
                    label="Additional Notes"
                    placeholder="Specific brand, additional print locations Etc.."
                    name="notes"
                    width={6}
                    value={this.state.notes}
                    onChange={this.changeHandler}
                  />
                <Button primary type="submit" name="submit">Submit Your Quote!</Button>
              </Form.Group>
            </Form>
          </div>
        </main>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedShirt: state.selectedShirt
  }
};

export default withRouter(connect(mapStateToProps)(QuotePage))