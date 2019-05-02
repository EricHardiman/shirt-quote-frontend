import React from 'react'
import { withRouter } from 'react-router-dom'
import {Card, Image} from 'semantic-ui-react'

const Style = (props) => {
  const clickHandler = (props) => {
    props.history.push(`/new_quote/style/${props.shirt.id}`)
  }


  return (
    <main style={{marginLeft: "auto", marginRight: "auto"}}>
      <Card onClick={() => clickHandler(props)}>
        <Image className="example-img" src={props.shirt.manufacture.logo}/>
        <Image className="example-img" src={props.shirt.front}/>
        <Card.Content>
          <Card.Header>{props.shirt.name}</Card.Header>
          <Card.Description>Sizes Available: {props.shirt.size}</Card.Description>
        </Card.Content>
      </Card>
    </main>
  )

}

export default withRouter(Style)