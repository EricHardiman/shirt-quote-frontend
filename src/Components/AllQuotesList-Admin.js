import React from 'react'
import AllQuotesShow from './AllQuotesShow-Admin'

const AllQuotesList = (props) => {
  return(
    props.quotes.map(quoteObj => (<AllQuotesShow key={quoteObj.id} quote={quoteObj}/>))
  )
}

export default AllQuotesList