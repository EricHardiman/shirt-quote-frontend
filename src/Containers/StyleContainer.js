import React, { Component } from 'react'
import StyleList from '../Components/StyleList'

class StyleContainer extends Component {
  state = {
    shirts: []
  }

  componentDidMount() {
    fetch(`${this.props.apiUrl}/styles`)
      .then(res => res.json())
      .then(data => {
        this.setState({shirts: data})
      })
  }

  render() {
    return (
      <StyleList handleClick={this.handleClick} shirts={this.state.shirts}/>
    )
  }
}

export default StyleContainer