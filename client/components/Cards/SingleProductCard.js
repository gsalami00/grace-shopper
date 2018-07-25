import React, {Component} from 'react'
import {Card, Icon, Image, Button} from 'semantic-ui-react'

const SingleProductCard = props => (
  <Card>
    <Image src={props.imageUrl} />
    <Card.Content>
      <Card.Header>{props.species}</Card.Header>
      <Card.Description>{props.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <span>${props.price / 100}</span>
      <Button animated="vertical">
        <Button.Content hidden>Add</Button.Content>
        <Button.Content visible>
          <Icon name="shop" />
        </Button.Content>
      </Button>
    </Card.Content>
  </Card>
);

export default SingleProductCard;
