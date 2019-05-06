import React, { Component, Fragment } from 'react'
import {Button, Card, Modal} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import Navbar from "./Navbar";

const JWT = require('jsonwebtoken');

class QuoteShowPage extends Component {
  userId = JWT.verify(localStorage.getItem("token"), 'secret').user_id
  quoteId = this.props.match.params.id

  state = {
    quote: null,
    open: false
  }

  deleteHandler = () => {
    const token = localStorage.getItem("token")
    fetch(`${this.props.apiUrl}/quotes/${this.quoteId}`, {
      method: 'delete',
      headers:{
        authorization: token
      }
    })
    this.setState({open: false}, this.props.history.push('/quotes'))
  }

  close = () => this.setState({ open: false })

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

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ open: true })
  }

  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state
    console.log("THIS IS IN THE QUOTE SHOW PAGE", this.state.quote)
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
                    <h1>Attached Files</h1>
                    <Card.Group itemsPerRow={6}>
                    {this.state.quote.images.map(image => (<Card raised image={image.url} />))}
                    </Card.Group>
                    <Button color="blue" onClick={() => this.props.history.push(`/quotes/${this.state.quote.quote_number}/edit`)}>Edit Quote</Button>
                    {/*Modal*/}
                    <Button negative onClick={this.closeConfigShow(true, false)}>Delete Quote</Button>

                    <Modal
                      open={open}
                      closeOnEscape={closeOnEscape}
                      closeOnDimmerClick={closeOnDimmerClick}
                      onClose={this.close}
                    >
                      <Modal.Header>Delete {this.state.quote.shirt_type}?</Modal.Header>
                      <Modal.Content>
                        <p>Are you sure you want to delete this quote?</p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button onClick={this.close} negative>No</Button>
                        <Button
                          onClick={this.deleteHandler}
                          positive
                          labelPosition='right'
                          icon='checkmark'
                          content='Yes'
                        />
                      </Modal.Actions>
                    </Modal>
                    {/*Modal*/}
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