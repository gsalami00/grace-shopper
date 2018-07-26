import React from 'react'
import {Grid, Image, Form, Button, Icon} from 'semantic-ui-react'

const options = [
  {key: '1', text: '1', value: '1'},
  {key: '2', text: '2', value: '2'},
  {key: '3', text: '3', value: '3'},
  {key: '4', text: '4', value: '4'},
  {key: '5', text: '5', value: '5'},
  {key: '6', text: '6', value: '6'},
  {key: '7', text: '7', value: '7'},
  {key: '8', text: '8', value: '8'},
  {key: '9', text: '9', value: '9'},
  {key: '10', text: '10', value: '10'}
]

const ItemCartCard = props => (
  <div className="cart-items-container">
    <Grid>
      <Grid.Column width={4}>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Chinchilla-Soelvmarmorert.jpg/220px-Chinchilla-Soelvmarmorert.jpg" />
      </Grid.Column>
      <Grid.Column width={4}>
        <h3>Imaginary Description</h3>
        <p>Lorem ipsum dolor sit amet.</p>
      </Grid.Column>
      <Grid.Column width={2}>
        <h3>Price</h3>
        <p>$900000</p>
      </Grid.Column>
      <Grid.Column width={6}>
        <h3>Quantity</h3>
        <Form>
          <Form.Group widths="equal">
            <Form.Select
              className="update-cart-dropdown"
              fluid
              options={options}
              placeholder="#"
            />
            <Button
              className="update-cart-button"
              widths="equal"
              animated="vertical"
            >
              <Button.Content hidden>
                <Icon name="check" />
              </Button.Content>
              <Button.Content visible>Update</Button.Content>
            </Button>
            <Button className="remove-cart-button" animated="vertical">
              <Button.Content hidden>
                <Icon name="times" />
              </Button.Content>
              <Button.Content visible>Remove</Button.Content>
            </Button>
          </Form.Group>
        </Form>
      </Grid.Column>
    </Grid>
  </div>
)

export default ItemCartCard
