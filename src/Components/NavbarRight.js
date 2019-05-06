import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

const JWT = require("jsonwebtoken");

const NavbarRight = props => {
  return localStorage.getItem("token") === null ? (
    <Fragment>
      <div className="item">
        <a className="ui button" href="/register">
          Sign Up
        </a>
      </div>
      <div className="item">
        <a className="ui green button" href="/login">
          Log In
        </a>
      </div>
    </Fragment>
  ) : (
    <div className="ui simple dropdown item">
      <i className="user icon" />
      &nbsp;
      {JWT.verify(localStorage.getItem("token"), "secret").username}{" "}
      <i className="dropdown icon" />
      <div className="menu">
        <a className="item" href="/quotes">
          My Quotes
        </a>
        <a className="item" href="/new_quote">
          New Quote
        </a>
        <a className="item" href="/contact">
          Help
        </a>
        <div className="divider" />
        <p className="item" onClick={() => props.logout()}>
          Sign Out
        </p>
      </div>
    </div>
  );
};

export default withRouter(NavbarRight);
