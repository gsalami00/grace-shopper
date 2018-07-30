import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Grid, Image, Form, Button, Icon} from 'semantic-ui-react'
import {postCartItem} from '../../store'


class ItemCartCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0,
      displayQuantity: 0
    }
    this.setQuantity = this.setQuantity.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  async componentDidMount() {
    await this.setState({
      displayQuantity: this.props.cartItem.quantity,
      quantity: this.props.cartItem.quantity
    })
  }
  async setQuantity(event) {
    await this.setState({
      quantity: event.target.value
    })
    // Gonna have to update with postCartItem() here
  }
  async handleClick(){
    const newQuantity = this.state.quantity;
    await this.setState({
      displayQuantity: newQuantity
    })
  }
  render() {
    const decimalizedPrice = (this.props.cartItem.animal.price / 100).toFixed(2)
    return (
      <div className="cart-items-container">
        <Grid>
          <Grid.Column width={4}>
            <Image src={this.props.cartItem.animal.imageUrl} />
          </Grid.Column>
          <Grid.Column width={4}>
            <h3>Description</h3>
            <p>{this.props.cartItem.animal.description}</p>
          </Grid.Column>
          <Grid.Column width={2}>
            <h3>Price</h3>
            <p>{decimalizedPrice}</p>
          </Grid.Column>
          <Grid.Column width={4}>
            <Form>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Quantity</label>
                  <input
                    type="text"
                    value={this.state.quantity}
                    onChange={this.setQuantity}
                  />
                </Form.Field>
                <Button
                  className="update-cart-button"
                  widths="equal"
                  animated="vertical"
                  onClick={this.handleClick}
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
          <Grid.Column width={2}>
            <h3>Item Total</h3>
            <p>
              {(decimalizedPrice * this.state.displayQuantity).toFixed(2)}
            </p>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  postCartItem: cartObj => dispatch(postCartItem(cartObj))
})

export default connect(null, mapDispatch)(ItemCartCard)
