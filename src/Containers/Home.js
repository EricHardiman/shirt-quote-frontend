import React, { Component } from 'react'
import Navbar from "./Navbar";

class Home extends Component {

  state = {
    user: {},
    shirts: {}
  }

  componentDidMount() {
    if (localStorage.getItem("token") !== null) {
      fetch(`${this.props.apiUrl}/profile`, {
        headers: {
          "content-type": "application/json",
          accepts: "application/json",
          authorization: `${localStorage.getItem("token")}`
        }
      })
        .then(response => response.json())
        .then(data => this.setState({ user: data.user }));
    }
    this.fetchShirts()
  }

  fetchShirts() {
    fetch(`${this.props.apiUrl}/styles`)
      .then(res => res.json())
      .then(data => {
        this.setState({shirts: data})
      })
  }

  render() {
    return (
      <div>
        <Navbar shirts={this.state.shirts}/>
        <main style={{ marginTop: '4em' }}>
          <h1>Home Page</h1>
        </main>
      </div>
    )
  }
}

export default Home