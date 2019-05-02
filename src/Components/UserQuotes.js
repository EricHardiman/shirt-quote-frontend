import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'

const UserQuotes = props => {

  const clickHandler = props => {
    props.history.push(`/quotes/${props.quote.quote_number}`)
  }

  return(
    <Fragment>
      <h1 onClick={() => clickHandler(props)}>{props.quote.quote_number}</h1>
    </Fragment>
  )
}

export default withRouter(UserQuotes)