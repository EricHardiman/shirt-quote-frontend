import React, { Component, Fragment } from "react";
import { Button, Card, Modal, Grid, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import Navbar from "./Navbar";

const JWT = require("jsonwebtoken");

class QuoteShowPage extends Component {
  userId = JWT.verify(localStorage.getItem("token"), "secret").user_id;
  quoteId = this.props.match.params.id;

  state = {
    quote: null,
    open: false
  };

  deleteHandler = () => {
    const token = localStorage.getItem("token");
    fetch(`${this.props.apiUrl}/quotes/${this.quoteId}`, {
      method: "delete",
      headers: {
        authorization: token
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState(
          { open: false },
          this.props.isAdmin
            ? this.props.history.push("/all_quotes")
            : this.props.history.push("/quotes")
        );
      });
  };

  close = () => this.setState({ open: false });

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

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ open: true });
  };

  render() {
    console.log(this.state.quote);
    const { open, closeOnEscape, closeOnDimmerClick } = this.state;
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
                <Grid centered columns={4}>
                  <Grid.Row>
                    <Grid.Column width={3}>
                      <Image src={this.state.quote.front} />
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <h3>
                        {this.state.quote.shirt_type} in{" "}
                        {this.state.quote.color}
                      </h3>
                      <h3>Contact Info:</h3>
                      {this.state.quote.org_name !== "" ? (
                        <p>{this.state.quote.org_name}</p>
                      ) : null}
                      <p>{this.state.quote.full_name}</p>
                      <p>{this.state.quote.add_one}</p>
                      {this.state.quote.add_two !== "" ? (
                        <p>{this.state.quote.add_two}</p>
                      ) : null}
                      <p>
                        {this.state.quote.city}, {this.state.quote.state}
                      </p>
                      <p>{this.state.quote.country}</p>
                      <p>{this.state.quote.email}</p>
                      <h3>Sizes Chosen:</h3>
                      <p>{this.state.quote.sizes}</p>
                      <h3>Additional Notes:</h3>
                      <p>
                        {this.state.quote.notes !== ""
                          ? this.state.quote.notes
                          : "No Additional Notes Given."}
                      </p>
                      <h3>
                        Quote Reference Number:{" "}
                        <u>{this.state.quote.quote_number}</u>
                      </h3>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={3}>
                      <Image src={this.state.quote.back} />
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <h2>Attached Files</h2>
                      <Card.Group itemsPerRow={3}>
                        {this.state.quote.images.map(image => (
                          <Card
                            raised
                            href={image.url}
                            target="_blank"
                            image={image.url}
                          />
                        ))}
                      </Card.Group>
                      <p> </p>
                      {/* {this.state.quote.status !== "Pending" ? null : (
                        <Fragment>
                          <Button
                            color="blue"
                            onClick={() =>
                              this.props.history.push(
                                `/quotes/${this.state.quote.quote_number}/edit`
                              )
                            }
                          >
                            Edit Quote
                          </Button>

                          <Button
                            negative
                            onClick={this.closeConfigShow(true, false)}
                          >
                            Delete Quote
                          </Button>
                        </Fragment>
                      )} */}
                      {this.props.isAdmin ||
                      this.state.quote.status === "Pending" ? (
                        <Fragment>
                          <Button
                            color="blue"
                            onClick={() =>
                              this.props.history.push(
                                `/quotes/${this.state.quote.quote_number}/edit`
                              )
                            }
                          >
                            Edit Quote
                          </Button>

                          <Button
                            negative
                            onClick={this.closeConfigShow(true, false)}
                          >
                            Delete Quote
                          </Button>
                        </Fragment>
                      ) : null}
                    </Grid.Column>
                  </Grid.Row>
                  {/*Modal*/}
                  <Modal
                    open={open}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.close}
                  >
                    <Modal.Header>
                      Delete {this.state.quote.shirt_type}?
                    </Modal.Header>
                    <Modal.Content>
                      <p>Are you sure you want to delete this quote?</p>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button onClick={this.close} negative>
                        No
                      </Button>
                      <Button
                        onClick={this.deleteHandler}
                        positive
                        labelPosition="right"
                        icon="checkmark"
                        content="Yes"
                      />
                    </Modal.Actions>
                  </Modal>
                  {/*Modal*/}
                </Grid>
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

export default withRouter(connect(mapStateToProps)(QuoteShowPage));
