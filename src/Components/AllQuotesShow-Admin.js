import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

const AllQuotesShow = props => {
  const clickHandler = props => {
    props.history.push(`/quotes/${props.quote.quote_number}`);
  };

  return (
    <Fragment>
      <h2 onClick={() => clickHandler(props)}>{props.quote.quote_number}</h2>
    </Fragment>
  );
};

export default withRouter(AllQuotesShow);
