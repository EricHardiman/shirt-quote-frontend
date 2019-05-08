import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Carousel from "semantic-ui-carousel-react";
import { Image, Card, Grid, Sticky } from "semantic-ui-react";
import { withRouter, Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import QuotePage from "./QuotePage";

class StylePage extends Component {
  elements = [
    {
      render: () => {
        return <Image src={this.props.selectedShirt.front} />;
      }
    },
    {
      render: () => {
        return <Image src={this.props.selectedShirt.back} />;
      }
    }
  ];

  colorClickHandle = color => {
    const prevState = { ...this.props.selectedShirt };
    prevState.front = color.front;
    prevState.back = color.back;
    prevState.starting_color = color.actual_color;
    this.props.dispatch({
      type: "select_shirt",
      payload: prevState
    });
  };

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      return <Redirect to="/" />;
    } else {
      window.scrollTo(0, 0);
      const styleId = this.props.match.params.id;
      fetch(`${this.props.apiUrl}/styles/${styleId}`)
        .then(res => res.json())
        .then(data =>
          this.props.dispatch({
            type: "select_shirt",
            payload: data
          })
        );
    }
  }

  render() {
    return (
      <Fragment>
        <Navbar innerRef={this.contextRef} />
        <Grid centered columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Sticky context={this.contextRef}>
                <Card>
                  <Carousel
                    elements={this.elements}
                    animation="fade"
                    showNextPrev={true}
                    showIndicators={true}
                  />
                  <Card.Content>
                    <Card.Header>{this.props.selectedShirt.name}</Card.Header>
                    <Card.Description>
                      Sizes Available: {this.props.selectedShirt.size}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    {this.props.selectedShirt.colors
                      ? this.props.selectedShirt.colors.map(color =>
                          !color.multi ? (
                            <div
                              className="color-box"
                              key={"SomeKey"}
                              style={{ backgroundColor: color.name }}
                              onClick={() => this.colorClickHandle(color)}
                            />
                          ) : (
                            <div
                              onClick={() => this.colorClickHandle(color)}
                              className="color-box"
                            >
                              <div
                                className="left-half"
                                style={{ backgroundColor: color.name }}
                              >
                                &nbsp;
                              </div>
                              <div
                                className="right-half"
                                style={{ backgroundColor: color.name2 }}
                              >
                                &nbsp;
                              </div>
                            </div>
                          )
                        )
                      : null}
                  </Card.Content>
                </Card>
              </Sticky>
            </Grid.Column>
            <Grid.Column>
              <QuotePage apiUrl={this.props.apiUrl} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedShirt: state.selectedShirt
  };
};
export default withRouter(connect(mapStateToProps)(StylePage));
