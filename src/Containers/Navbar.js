import React, { Fragment, Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import NavbarRight from "../components/NavbarRight";
import { Menu, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {
    allQuotes: []
  };

  logout = () => {
    localStorage.clear();
    this.props.dispatch({ type: "logout" });
    this.props.history.push("/");
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.dispatch({ type: "admin" });
    }
    if (this.props.isAdmin && this.props.loggedIn) {
      fetch(`http://localhost:3000/api/v1/all_quotes`)
        .then(res => res.json())
        .then(data => this.setState({ allQuotes: data }));
    }
  }

  render() {
    const pending = this.state.allQuotes.filter(
      quote => quote.status === "Pending"
    );

    return (
      <main style={{ marginBottom: "5em" }}>
        <header>
          <div className="ui fixed inverted menu" style={this.props.style}>
            <div className="ui container">
              <a
                href="/"
                className={`header item logo-font nav-logo ${
                  this.props.history.location.pathname === "/" ? "active" : null
                }`}
              >
                <i className="shirtsinbulk icon" />
                Shirt Quote
              </a>
              {/*Admin Navbar*/}
              {this.props.isAdmin && this.props.loggedIn ? (
                <Fragment>
                  <Menu.Item
                    as={Link}
                    to="/all_quotes"
                    className={`item ${
                      this.props.history.location.pathname === "/all_quotes"
                        ? "active"
                        : null
                    }`}
                  >
                    All Quotes
                    {pending.length > 0 ? (
                      <Label color="red">{pending.length}</Label>
                    ) : null}
                  </Menu.Item>
                  <Menu.Item
                    as={Link}
                    to="/create_chat"
                    className={`item ${
                      this.props.history.location.pathname === "/create_chat"
                        ? "active"
                        : null
                    }`}
                  >
                    Start Customer Chat
                  </Menu.Item>
                </Fragment>
              ) : null}

              {/*Normal User Navbar*/}
              {!this.props.isAdmin && this.props.loggedIn ? (
                <Fragment>
                  <a
                    href="/quotes"
                    className={`item ${
                      this.props.history.location.pathname === "/quotes"
                        ? "active"
                        : null
                    }`}
                  >
                    My Quotes
                  </a>
                  <a
                    href="/new_quote"
                    className={`item ${
                      this.props.history.location.pathname.includes(
                        "/new_quote"
                      )
                        ? "active"
                        : null
                    }`}
                  >
                    New Quote
                  </a>
                </Fragment>
              ) : null}

              <div className="right menu">
                <NavbarRight logout={this.logout} />
              </div>
            </div>
          </div>
        </header>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    isAdmin: state.isAdmin
  };
};

export default withRouter(connect(mapStateToProps)(Navbar));
