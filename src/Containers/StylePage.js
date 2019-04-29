import React, { Component, Fragment } from 'react'
import  Carousel  from  'semantic-ui-carousel-react';
import { Image, Card, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
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
        return <Image src={this.state.selectedStyle.front}/>
      }
    },
  ]

  colorClickHandle = () => {
    const prevState = {...this.state.selectedStyle}
    prevState.front = "https://www.nextlevelapparel.com/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/6/1/6110-BLACK-F_7.jpg"
    this.setState({selectedStyle: prevState})
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    const styleId = this.props.match.params.id
    fetch(`${this.props.apiUrl}/styles/${styleId}`)
      .then(res => res.json())
      .then(data => this.setState({selectedStyle: data}))
  }

  render() {
    return(
      <Fragment>
        <Navbar />
        <main style={{ marginTop: '3em'}}>
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
              <div className="color-box" style={{backgroundColor: 'yellow'}} onClick={this.colorClickHandle}></div>
              <div className="color-box" style={{backgroundColor: 'blue'}}></div>
            </Card.Content>
          </Card>
          <Button primary onClick={this.submitHandle}>Start Your Quote!</Button>
        </main>
      </Fragment>
    )
  }
}


export default withRouter(StylePage)