import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Card, Image, Icon } from "semantic-ui-react";

const AllQuotesShow = props => {
  const clickHandler = props => {
    props.history.push(`/quotes/${props.quote.quote_number}`);
  };

  return (
    <Fragment>
      <Card
        style={
          props.quote.status === "Pending"
            ? { border: "3px solid red" }
            : { border: "3px solid green" }
        }
        onClick={() => clickHandler(props)}
      >
        <Image src={props.quote.front} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{props.quote.full_name}</Card.Header>
          <Card.Meta>
            <span>
              <b>{props.quote.quote_number}</b>
            </span>
          </Card.Meta>
          <Card.Description>{props.quote.sizes}</Card.Description>
          <Card.Description>{props.quote.notes}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="camera" />
            {props.quote.images.length} Attachments Uploaded
          </a>
        </Card.Content>
      </Card>
    </Fragment>
  );
};

export default withRouter(AllQuotesShow);
