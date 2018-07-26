import React, {Component} from 'react'
import {Card, Icon, Image, Button, Header, Modal } from 'semantic-ui-react'

const SingleProductCard = props => (
  <Card>
    <Image src={props.imageUrl} />
    <Card.Content>
      <Card.Header>{props.species}</Card.Header>
      {/* <Card.Description>{props.description}</Card.Description> */}
    </Card.Content>
    <Card.Content extra>
      <span>${props.price / 100}</span>
      <div className="right-aligned-button">
        <Button animated="vertical">
          <Button.Content hidden>Add</Button.Content>
          <Button.Content visible>
            <Icon name="shop" />
          </Button.Content>
        </Button>
        <Modal trigger={<Button>Details</Button>}>
          <Modal.Header>{props.species}</Modal.Header>
          <Modal.Content image>
          <div className="image content">
            <Image src={props.imageUrl} />
          </div>
            <Modal.Description>
              <h2>{props.description}</h2>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    </Card.Content>
  </Card>
)

export default SingleProductCard
