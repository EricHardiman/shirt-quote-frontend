import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import NavbarRight from "../Components/NavbarRight";

class Navbar extends Component {
  state = {
    loggedIn: localStorage.getItem("token") !== null ? true : false,
  }

  logout = () => {
    localStorage.removeItem("token");
    this.setState({
      loggedIn: false,
    });
  }

  handleSearchChange = (e, { value }) => {
    const source = this.props.podcasts ? this.props.podcasts : this.props.episodes
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      console.log(_.filter(source, isMatch))

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

  render() {
    return (
      <header>
        <div className="ui fixed inverted menu" style={this.props.style}>
          <div className="ui container">
            <a href="/" className={`header item logo-font nav-logo ${this.props.history.location.pathname === '/' ? 'active' : null}`}>
              <i className="shirtsinbulk icon"></i>
              Shirt Quote
            </a>
            {this.state.loggedIn ?
              <Fragment>
              <a href="/quotes" className={`item ${this.props.history.location.pathname === '/quotes' ? 'active' : null}`}>My Quotes</a>
              <a href="/new_quote" className={`item ${this.props.history.location.pathname.includes('/new_quote')  ? 'active' : null}`}>New Quote</a>
              </Fragment> : null}
            }
            <div className="right menu">
              <NavbarRight logout={this.logout}/>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(Navbar);
