import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import  Carousel  from  'semantic-ui-carousel-react';
import { Image, Card, Button } from 'semantic-ui-react'
import { withRouter, Redirect } from 'react-router-dom'
import Navbar from "./Navbar";

class StylePage extends Component {

  state = {
    selectedStyle: []

  }

  convert = require('color-convert')

  elements = [
    {
      render:()=>{
        return <Image src={this.state.selectedStyle.front}/>
      }
    },
    {
      render:()=>{
        return <Image src={this.state.selectedStyle.back}/>
      }
    },
  ]

  submitHandle = () => {
    this.props.dispatch({type: "select_shirt", payload: this.state.selectedStyle})
    this.props.history.push('/new_quote/selected')
  }

  colorClickHandle = (color) => {
    const prevState = {...this.state.selectedStyle}
    prevState.front = color.front
    prevState.back = color.back
    prevState.starting_color = color.actual_color
    this.setState({selectedStyle: prevState})
  }

  componentDidMount() {
    if (!localStorage.getItem("token")){
      return <Redirect to='/'/>
    } else {
      window.scrollTo(0, 0)
      const styleId = this.props.match.params.id
      fetch(`${this.props.apiUrl}/styles/${styleId}`)
        .then(res => res.json())
        .then(data => this.setState({selectedStyle: data}))
    }
  }

  render() {
    return(
      <Fragment>
        <Navbar />
          <Card>
            <Carousel
              elements  =  { this.elements }
              animation  = 'fade'
              showNextPrev  =  {true}
              showIndicators  = {true}
            />
            <Card.Content>
              <Card.Header>{this.state.selectedStyle.name}</Card.Header>
              <Card.Description>Sizes Available: {this.state.selectedStyle.size}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              {this.state.selectedStyle.colors ? this.state.selectedStyle.colors.map(color => (
                !color.multi ?
                <div className="color-box" style={{backgroundColor: color.name}} onClick={() => this.colorClickHandle(color)}></div> :
                  <div onClick={() => this.colorClickHandle(color)} className="color-box">
                    <div className="left-half" style={{backgroundColor: color.name}} >&nbsp;</div>
                    <div className="right-half" style={{backgroundColor: color.name2}}>&nbsp;</div>
                  </div>
              )):null}
            </Card.Content>
          </Card>
          <Button primary onClick={this.submitHandle}>Start Your Quote!</Button>
      </Fragment>
    )
  }
}


export default withRouter(connect()(StylePage))