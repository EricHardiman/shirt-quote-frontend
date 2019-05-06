import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux';
import _ from 'lodash'
import NavbarRight from "../Components/NavbarRight";

class Navbar extends Component {
  logout = () => {
    localStorage.clear();
    this.props.dispatch({type: "logout"})
    this.props.history.push('/')
  }

  handleSearchChange = (e, { value }) => {
    const source = this.props.podcasts ? this.props.podcasts : this.props.episodes
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)
      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.dispatch({type: 'admin'})
    }
  }

  render() {
    return (
      <main style={{marginBottom: '5em'}}>
       <header>
         <div className="ui fixed inverted menu" style={this.props.style}>
           <div className="ui container">
             <a href="/" className={`header item logo-font nav-logo ${this.props.history.location.pathname === '/' ? 'active' : null}`}>
               <i className="shirtsinbulk icon"></i>
               Shirt Quote
             </a>
               {/*Admin Navbar*/}
             {this.props.isAdmin && this.props.loggedIn ?
               <Fragment>
                 <a href="/all_quotes" className={`item ${this.props.history.location.pathname === '/all_quotes' ? 'active' : null}`}>All Quotes</a>
               </Fragment>
               : null}

               {/*Normal User Navbar*/}
             {!this.props.isAdmin && this.props.loggedIn ?
               <Fragment>
                 <a href="/quotes" className={`item ${this.props.history.location.pathname === '/quotes' ? 'active' : null}`}>My Quotes</a>
                 <a href="/new_quote" className={`item ${this.props.history.location.pathname.includes('/new_quote')  ? 'active' : null}`}>New Quote</a>
               </Fragment>
               : null}

             <div className="right menu">
               <NavbarRight logout={this.logout}/>
             </div>
           </div>
         </div>
       </header>
      </main>
     );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    isAdmin: state.isAdmin
  }
}

export default withRouter(connect(mapStateToProps)(Navbar));
