import React from "react";
import UserQuotes from "./UserQuotes";
const UserQuotesList = props => {
  return props.quotes.map(quoteObj => (
    <UserQuotes key={quoteObj.id} quote={quoteObj} />
  ));
};

export default UserQuotesList;
