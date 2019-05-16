import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Card, Image, Icon } from "semantic-ui-react";

const UserQuotes = props => {
  const clickHandler = props => {
    props.history.push(`/quotes/${props.quote.quote_number}`);
  };

  return (
    <Fragment>
      <Card onClick={() => clickHandler(props)}>
        <Image src={props.quote.front} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{props.quote.shirt_type}</Card.Header>
          <Card.Meta>
            <span>
              <b>{props.quote.quote_number}</b>
            </span>
          </Card.Meta>
          <Card.Description>{props.quote.sizes}</Card.Description>
          <Card.Description>{props.quote.notes}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <p>
            <Icon name="camera" />
            {props.quote.images.length} Attachments Uploaded
          </p>
        </Card.Content>
      </Card>
    </Fragment>
  );
};

export default withRouter(UserQuotes);
