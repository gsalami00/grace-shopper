import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Grid, Image, Form, Button, Icon} from 'semantic-ui-react'
import {
  postCartItem,
  updateCartItem,
  deleteItem,
  deleteCartItem
} from '../../store'

class ItemCartCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0,
      displayQuantity: 0,
      lineClamp: 'line-clamp',
      more: 'btn-read-more-show',
      less: 'btn-read-less-hide'
    }
    this.setQuantity = this.setQuantity.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.hideText = this.hideText.bind(this)
    this.showText = this.showText.bind(this)
  }
  hideText() {
    this.setState({
      lineClamp: 'line-clamp',
      more: 'btn-read-more-show',
      less: 'btn-read-more-hide'
    })
  }
  showText() {
    this.setState({
      lineClamp: 'no-clamp',
      more: 'btn-read-more-hide',
      less: 'btn-read-more-show'
    })
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
  }
  async handleClick() {
    const newQuantity = Number(this.state.quantity)
    await this.setState({
      displayQuantity: newQuantity
    })
    if (!this.props.user.id) {
      let cart = JSON.parse(localStorage.getItem('cart'))
      cart.forEach(cartItem => {
        if (cartItem.animal.id === this.props.cartItem.animal.id) {
          cartItem.quantity = this.state.quantity
        }
      })
      cart = JSON.stringify(cart)
      localStorage.setItem('cart', cart)
    } else {
      const {user} = this.props;
      const cartItem = {
        animal: this.props.cartItem.animal,
        quantity: newQuantity
      }
      await this.props.putCartItem(user.id, cartItem)
    }
  }
  handleDelete() {
    if (!this.props.user.id) {
      let cart = JSON.parse(localStorage.getItem('cart'))
      cart = cart.filter(
        cartItem => cartItem.animal.id !== this.props.cartItem.animal.id
      )
      cart = JSON.stringify(cart)
      localStorage.setItem('cart', cart)
      this.props.deleteCartItem(this.props.cartItem)
    } else {
      this.props.deleteItem(this.props.user.id, this.props.cartItem)
    }
  }
  render() {
    let decimalizedPrice = 0
    if (this.props.cartItem) {
      decimalizedPrice = (this.props.cartItem.animal.price / 100).toFixed(2)
    }
    return (
      <div className="cart-items-container">
        <Grid>
          <Grid.Column width={4}>
            <Image src={this.props.cartItem.animal.imageUrl} />
          </Grid.Column>
          <Grid.Column width={4}>
            <h3>Description</h3>
            <p className={this.state.lineClamp}>
              {this.props.cartItem.animal.description}
            </p>
            <button className={this.state.more} onClick={this.showText}>
              Read More
            </button>
            <button className={this.state.less} onClick={this.hideText}>
              Read Less
            </button>
          </Grid.Column>
          <Grid.Column width={2}>
            <h3>Price</h3>
            <p>${decimalizedPrice}</p>
          </Grid.Column>
          <Grid.Column width={4}>
            <Form onSubmit={this.handleClick}>
              <Form.Group widths="equal" className="view-cart-form-container">
                <Form.Field className="view-cart-form-field-container">
                  <label>
                    <h3>Quantity</h3>
                  </label>
                  <input
                    type="text"
                    value={this.state.quantity}
                    onChange={this.setQuantity}
                    pattern="^[0-9]*$"
                  />
                </Form.Field>
                <div className="update-cart-btn-container">
                  <Button
                    onClick={this.handleClick}
                    className="update-cart-button"
                    type="submit"
                    widths="equal"
                    animated="vertical"
                  >
                    <Button.Content hidden>
                      <Icon name="check" />
                    </Button.Content>
                    <Button.Content visible>Update</Button.Content>
                  </Button>
                </div>
                <div className="remove-cart-btn-container">
                  <Button
                    className="remove-cart-button"
                    animated="vertical"
                    onClick={this.handleDelete}
                  >
                    <Button.Content hidden>
                      <Icon name="times" />
                    </Button.Content>
                    <Button.Content visible>Remove</Button.Content>
                  </Button>
                </div>
              </Form.Group>
            </Form>
          </Grid.Column>
          <Grid.Column width={2}>
            <h3>Item Total</h3>
            <p>${(decimalizedPrice * this.state.displayQuantity).toFixed(2)}</p>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user.currentUser
})

const mapDispatch = dispatch => ({
  putCartItem: (userId, cartObj) => dispatch(putCartItem(userId, cartObj)),
  updateCartItem: cartItem => dispatch(updateCartItem(cartItem)),
  deleteItem: (userId, cartItem) => dispatch(deleteItem(userId, cartItem)),
  deleteCartItem: cartItem => dispatch(deleteCartItem(cartItem))
})

export default connect(mapState, mapDispatch)(ItemCartCard)
