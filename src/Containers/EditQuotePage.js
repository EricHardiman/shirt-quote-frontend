import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import Navbar from "./Navbar";
import {Button, Card, Form} from "semantic-ui-react";
import {connect} from "react-redux";

const JWT = require('jsonwebtoken');

class EditQuotePage extends Component {
  userId = JWT.verify(localStorage.getItem("token"), 'secret').user_id
  quoteId = this.props.match.params.id

  state = {
    quote: null,
  }

  changeHandler = (ev) => {
    this.setState({
      quote: {
        ...this.state.quote,
        [ev.target.name]: ev.target.value
      }
    })
  }

  openWidget = () => {
    window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_CLOUD_PRESET
      },
      (error, result) => {
        if (result && result.event === "success") {
          this.setState({
            quote: {
              ...this.state.quote,
              image_url: this.state.quote.image_url.concat(result.info.url)
            }
          })
        }
      }).open()
  }

  submitHandler = () => {
    const token = localStorage.getItem("token")
    this.setState({
      quote:{
        ...this.state.quote,
        status: "Edited, Waiting Changes Approval"
      }
    }, fetch(`${this.props.apiUrl}/quotes/${this.state.quote.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json",
        authorization: token
      },
      body: JSON.stringify({
        quote: this.state.quote
      })
    })
      .then(res => res.json())
      .then(data => {
        this.state.quote.image_url.map(image =>
        fetch(`${this.props.apiUrl}/images`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            accepts: "application/json",
            authorization: token
          },
          body: JSON.stringify({
            image: {
              quote_id: data.id,
              url: image
            }
          })
        }).then(this.props.history.push(`/quotes/${this.quoteId}`)))
      }))
  }

  removePhoto(inImage){
    const token = localStorage.getItem("token")
    const imageUrlCopy = [...this.state.quote.image_url]
    const imagesCopy = [...this.state.quote.images]

    const removedImage = imageUrlCopy.filter(image => {
      return image !== inImage
    })

    const foundId = imagesCopy.filter(image => {
      return image.url === inImage
    })
    this.setState({
      quote: {
        ...this.state.quote,
        image_url: removedImage
      }}, fetch(`${this.props.apiUrl}/images/${foundId[0].id}`, {
        method: 'delete',
        headers: {
          authorization: token
        }
      })
    )
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
    console.log(this.state.quote)
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
                  <main style={{ marginLeft: '4em'}}>
                    <div className="quote-form">
                      <Form>
                        <Form.Group grouped>
                          <Form.Input label='Full Name' width={5} name="full_name" value={this.state.quote.full_name} onChange={this.changeHandler}/>
                          <Form.Input label='Organization Name' width={5} name="org_name" value={this.state.quote.org_name} onChange={this.changeHandler}/>
                          <Form.Input label='Address 1' width={5} name="add_one" value={this.state.quote.add_one} onChange={this.changeHandler}/>
                          <Form.Input label='Address 2' width={5} name="add_two" value={this.state.quote.add_two} onChange={this.changeHandler}/>
                          <Form.Input label='City' width={5} name="city" value={this.state.quote.city} onChange={this.changeHandler}/>
                          <Form.Input label='State' width={5} name="state" value={this.state.quote.state} onChange={this.changeHandler}/>
                          <Form.Input label='Zip Code' width={5} name="zipcode" value={this.state.quote.zipcode} onChange={this.changeHandler}/>
                          <Form.Input label='Country' width={5} name="country" value={this.state.quote.country} onChange={this.changeHandler}/>
                          <Form.Input type="email" label='Email Address' width={5} name="email" value={this.state.quote.email} onChange={this.changeHandler}/>
                          <Form.Input attached readOnly label="Logo/Image Upload"  width={5} value={this.state.quote.image_url.length + ' Image(s) selected'}/>
                          <Button
                            positive
                            className="upload-button"
                            attached="bottom"
                            icon="upload"
                            content="Upload Images/Logo"
                            onClick={this.openWidget}
                          />
                          <Form.TextArea
                            label="Sizes"
                            placeholder="Please list all sizes and quantities needed! Adult and Youth sizes are available in most styles!  Additional fees may apply to sizes 2XL and up."
                            name="sizes"
                            width={6}
                            value={this.state.quote.sizes}
                            onChange={this.changeHandler}
                          />
                          <Form.TextArea
                            label="Additional Notes"
                            placeholder="Specific brand, additional print locations Etc.."
                            name="notes"
                            width={6}
                            value={this.state.quote.notes}
                            onChange={this.changeHandler}
                          />
                          <Button primary onClick={this.submitHandler}>Edit Your Quote!</Button>
                        </Form.Group>
                      </Form>
                      <Card.Group itemsPerRow={3}>
                        {this.state.quote.image_url.map(image =>
                          <Fragment>
                            <div attached>
                              <img style={{width: '25%'}} src={image}/>
                            </div>
                            <Button onClick={() => this.removePhoto(image)} attached='bottom'>Remove Attachment</Button>
                          </Fragment>
                          )}
                      </Card.Group>
                    </div>
                  </main>
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

export default withRouter(connect(mapStateToProps)(EditQuotePage))