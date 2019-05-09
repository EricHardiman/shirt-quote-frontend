import React, { Component, Fragment } from "react";
import { withRouter, Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import { Button, Card, Form, Grid, Image } from "semantic-ui-react";
import { connect } from "react-redux";

const JWT = require("jsonwebtoken");

const dropDownStatus = [
  {
    key: "Approved, In Progress",
    text: "Approved, In Progress",
    value: "Approved, In Progress"
  },
  {
    key: "Denied",
    text: "Denied",
    value: "Denied"
  }
];

class EditQuotePage extends Component {
  userId = JWT.verify(localStorage.getItem("token"), "secret").user_id;
  quoteId = this.props.match.params.id;

  state = {
    quote: null
  };

  statusChangeHandler = ev => {
    this.setState({
      quote: {
        ...this.state.quote,
        status: ev.target.innerText
      }
    });
  };

  changeHandler = ev => {
    this.setState({
      quote: {
        ...this.state.quote,
        [ev.target.name]: ev.target.value
      }
    });
  };

  openWidget = () => {
    const token = localStorage.getItem("token");
    window.cloudinary
      .createUploadWidget(
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
            });
            this.state.quote.image_url.map(image =>
              fetch(`${this.props.apiUrl}/images`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  accepts: "application/json",
                  authorization: token
                },
                body: JSON.stringify({
                  image: {
                    quote_id: this.state.quote.id,
                    url: image
                  }
                })
              }).then(() =>
                fetch(`${this.props.apiUrl}/get_quote/${this.quoteId}`)
                  .then(res => res.json())
                  .then(data => this.setState({ quote: data }))
              )
            );
          }
        }
      )
      .open();
  };

  submitHandler = () => {
    const token = localStorage.getItem("token");
    this.setState({
      quote: {
        ...this.state.quote,
        status: "Edited, Waiting Changes Approval"
      }
    });
    fetch(`${this.props.apiUrl}/quotes/${this.state.quote.id}`, {
      method: "PATCH",
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
            method: "POST",
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
          })
        );
      })
      .then(
        this.props.isAdmin
          ? this.props.history.push("/all_quotes")
          : this.props.history.push(`/quotes/${this.quoteId}`)
      );
  };

  removePhoto = inImage => {
    const token = localStorage.getItem("token");
    const imageUrlCopy = [...this.state.quote.image_url];
    const imagesCopy = [...this.state.quote.images];

    const removedImage = imageUrlCopy.filter(image => {
      return image !== inImage;
    });

    const foundId = imagesCopy.filter(image => {
      return image.url === inImage;
    });
    this.setState({
      quote: {
        ...this.state.quote,
        image_url: removedImage
      }
    });
    fetch(`${this.props.apiUrl}/images/${foundId[0].id}`, {
      method: "delete",
      headers: {
        authorization: token
      }
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    if (!localStorage.getItem("token")) {
      return <Redirect to="/" />;
    } else {
      fetch(`${this.props.apiUrl}/get_quote/${this.quoteId}`)
        .then(res => res.json())
        .then(data => this.setState({ quote: data }));
    }
  }

  render() {
    return (
      <Fragment>
        <Navbar />
        {(() => {
          if (!this.state.quote) {
            return <h1>Quote not found!</h1>;
          } else if (
            this.state.quote.user.id === this.userId ||
            this.props.isAdmin
          ) {
            return (
              <Fragment>
                <main style={{ marginLeft: "4em" }}>
                  <Grid centered columns={4}>
                    <Grid.Row>
                      <Grid.Column width={6}>
                        <Card.Group itemsPerRow={3}>
                          {this.state.quote.image_url.map(image => (
                            <Fragment>
                              <Card>
                                <Image
                                  src={image}
                                  href={image}
                                  target="_blank"
                                />
                                <Card.Content extra>
                                  <div className="ui center aligned">
                                    <Button
                                      basic
                                      color="red"
                                      onClick={() => this.removePhoto(image)}
                                    >
                                      Delete Image
                                    </Button>
                                  </div>
                                </Card.Content>
                              </Card>
                            </Fragment>
                          ))}
                        </Card.Group>
                      </Grid.Column>

                      <Grid.Column width={6}>
                        <div>
                          <Form>
                            <Form.Group grouped>
                              <Form.Input
                                label="Full Name"
                                width={16}
                                name="full_name"
                                value={this.state.quote.full_name}
                                onChange={this.changeHandler}
                                readOnly={this.props.isAdmin ? true : false}
                              />
                              <Form.Input
                                label="Organization Name"
                                width={16}
                                name="org_name"
                                value={this.state.quote.org_name}
                                onChange={this.changeHandler}
                                readOnly={this.props.isAdmin ? true : false}
                              />
                              <Form.Input
                                label="Address 1"
                                width={16}
                                name="add_one"
                                value={this.state.quote.add_one}
                                onChange={this.changeHandler}
                                readOnly={this.props.isAdmin ? true : false}
                              />
                              <Form.Input
                                label="Address 2"
                                width={16}
                                name="add_two"
                                value={this.state.quote.add_two}
                                onChange={this.changeHandler}
                                readOnly={this.props.isAdmin ? true : false}
                              />
                              <Form.Input
                                label="City"
                                width={16}
                                name="city"
                                value={this.state.quote.city}
                                onChange={this.changeHandler}
                                readOnly={this.props.isAdmin ? true : false}
                              />
                              <Form.Input
                                label="State"
                                width={16}
                                name="state"
                                value={this.state.quote.state}
                                onChange={this.changeHandler}
                                readOnly={this.props.isAdmin ? true : false}
                              />
                              <Form.Input
                                label="Zip Code"
                                width={16}
                                name="zipcode"
                                value={this.state.quote.zipcode}
                                onChange={this.changeHandler}
                                readOnly={this.props.isAdmin ? true : false}
                              />
                              <Form.Input
                                label="Country"
                                width={16}
                                name="country"
                                value={this.state.quote.country}
                                onChange={this.changeHandler}
                                readOnly={this.props.isAdmin ? true : false}
                              />
                              <Form.Input
                                type="email"
                                label="Email Address"
                                width={16}
                                name="email"
                                value={this.state.quote.email}
                                onChange={this.changeHandler}
                                readOnly={this.props.isAdmin ? true : false}
                              />
                              {this.props.isAdmin ? (
                                <Form.Dropdown
                                  label="Select Status for Customer"
                                  selection
                                  placeholder="Select Status"
                                  options={dropDownStatus}
                                  onChange={this.statusChangeHandler}
                                  width={16}
                                />
                              ) : null}
                              <Form.Input
                                readOnly
                                label="Logo/Image Upload"
                                width={16}
                                value={
                                  this.state.quote.image_url.length +
                                  " Image(s) selected"
                                }
                              />
                              <Form.Button
                                positive
                                width={16}
                                className="upload-button"
                                attached
                                disabled={this.props.isAdmin ? true : false}
                                icon="upload"
                                content="Upload Images/Logo"
                                onClick={this.openWidget}
                                readOnly={this.props.isAdmin ? true : false}
                              />
                              <Form.TextArea
                                label="Sizes"
                                placeholder="Please list all sizes and quantities needed! Adult and Youth sizes are available in most styles!  Additional fees may apply to sizes 2XL and up."
                                name="sizes"
                                width={16}
                                value={this.state.quote.sizes}
                                onChange={this.changeHandler}
                                readOnly={this.props.isAdmin ? true : false}
                              />
                              <Form.TextArea
                                label="Additional Notes"
                                placeholder="Specific brand, additional print locations Etc.."
                                name="notes"
                                width={16}
                                value={this.state.quote.notes}
                                onChange={this.changeHandler}
                                readOnly={this.props.isAdmin ? true : false}
                              />
                              <Form.Button
                                primary
                                attached
                                width={16}
                                onClick={this.submitHandler}
                              >
                                {this.props.isAdmin
                                  ? "Edit Customer Quote!"
                                  : "Edit Your Quote!"}
                              </Form.Button>
                            </Form.Group>
                          </Form>
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </main>
              </Fragment>
            );
          } else {
            return <Redirect to="/" />;
          }
        })()}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAdmin: state.isAdmin
  };
};

export default withRouter(connect(mapStateToProps)(EditQuotePage));
