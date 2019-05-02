import React, { Component, Fragment } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import Navbar from "./Navbar";

const JWT = require('jsonwebtoken');

class QuoteShowPage extends Component {
  userId = JWT.verify(localStorage.getItem("token"), 'secret').user_id
  quoteId = this.props.match.params.id

  state = {
    quote: null
  }

  deleteHandler = () => {
    console.log("Delete", this.quoteId)
  }

  editHandler = () => {
    console.log("Edit", this.quoteId)
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    if (!localStorage.getItem("token")){
      return <Redirect to='/'/>
    } else {
      fetch(`${this.props.apiUrl}/get_quote/${this.quoteId}`)
        .then(res => res.json())
        .then(data => this.setState({quote: data}))
    }
  }

  render() {
    return (
      <Fragment>
        <Navbar/>
          {
            (() => {
              if (!this.state.quote) {
                return (
                  <h1>Quote not found!</h1>
                )
              } else if (this.state.quote.user.id === this.userId || this.props.isAdmin) {
                return (
                  <Fragment>
                    <h1>{this.state.quote.sizes}</h1>
                    <Button onClick={this.editHandler} color="blue">Edit Quote</Button>
                    <Button onClick={this.deleteHandler} negative>Cancel Quote</Button>
                  </Fragment>
                )
              } else {
                return <Redirect to='/'/>
              }
            })()
          }
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.isAdmin
  }
}

export default withRouter(connect(mapStateToProps)(QuoteShowPage))