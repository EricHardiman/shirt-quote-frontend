import React, { Fragment } from 'react'
import Style from './Style'
import { Card } from 'semantic-ui-react'
import Navbar from "../Containers/Navbar";

const StyleList = (props) => {
  return (
    <Fragment>
      <Navbar/>
      <Card.Group itemsPerRow={4}>
        {props.shirts.map(shirtObj => (<Style key={shirtObj.id} handleClick={props.handleClick} shirt={shirtObj}/>))}
      </Card.Group>
    </Fragment>
  )
}

export default StyleList