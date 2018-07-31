import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Icon, Image, Button, Modal, Form} from 'semantic-ui-react'
import {postCartItem, setCartItems} from '../../store/'

class SingleProductCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      quantity: '1',
      showNotification: false
    }
    this.setQuantity = this.setQuantity.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.setNewCart = this.setNewCart.bind(this)
  }
  closeModal() {
    this.setState({
      showModal: false
    })
  }
  openModal() {
    this.setState({
      showModal: true
    })
  }
  async setQuantity(event) {
    await this.setState({
      quantity: event.target.value
    })
  }
  async addToCart() {
    const userId = this.props.user.id;
    const newCartItem = {
      animal: this.props.animal,
      quantity: parseInt(this.state.quantity)
    }
    if (this.props.user.id) {
      this.props.postCartItem(userId, newCartItem)
    } else {
      let cart = localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : [];
      cart = this.setNewCart(cart, newCartItem);
      this.props.setCartItems(cart);
      const stringifiedCart = JSON.stringify(cart);
      localStorage.setItem('cart', stringifiedCart);
    }
    await this.setState({quantity: '1'})
    this.setState({
      showNotification: true
    })
    setTimeout(() => {
      this.setState({
        showNotification: false
      })
    }, 1750)
  }
  setNewCart(cart, newCartItem) {
    const itemIndex = cart.findIndex(
      cartItem => cartItem.animal.id === this.props.animal.id
    )
    if (itemIndex === -1) {
      cart.push(newCartItem)
    } else {
      cart[itemIndex].quantity = cart[itemIndex].quantity + newCartItem.quantity
    }
    return cart
  }
  render() {
    const price = (this.props.animal.price / 100).toFixed(2);
    return (
      <Card className="single-card-tile">
        <Image src={this.props.animal.imageUrl} />
        <Card.Content>
          <Card.Header>{this.props.animal.species}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <span>${price}</span>
          <div className="right-aligned-button">
            <Form className="single-cart-quantity-form" onSubmit = {this.addToCart}>
              <Form.Field>
                <label>
                  Quantity
                  {this.state.showNotification ? (
                    <div className="added-to-cart-message">Added to Cart!</div>
                  ) : (
                    <p />
                  )}
                </label>
                <input
                  type="text"
                  value={this.state.quantity}
                  onChange={this.setQuantity}
                  id="input"
                  pattern= "^[0-9]*$"
                  // onInvalid="setCustomValidity('mobile number must contain 10 digits ...')"
                  // onInput="setCustomValidity('')"
                  />

            <Button
              type="submit"
              className="add-cart-btn-home"x

            >
              <Button.Content hidden>Add</Button.Content>
              <Button.Content visible>
                <Icon name="shop" />
              </Button.Content>
            </Button>
            </Form.Field>
          </Form>
            <Modal
              open={this.state.showModal}
              trigger={
                <Button onClick={() => this.setState({showModal: true})}>
                  Details
                </Button>
              }
            >
              <Modal.Header>
                <div className="species-name">
                  {this.props.animal.species + ' - $' + price}
                </div>
                <i
                  id="exit-modal"
                  className="modal-close window close icon"
                  onClick={() => this.setState({showModal: false})}
                />
                <div className="clear" />
              </Modal.Header>
              <Modal.Content image>
                <div className="image content" id="modal-image">
                  <Image src={this.props.animal.imageUrl} />
                </div>
                <div className="modal-description">
                  <Modal.Description>
                    <p>{this.props.animal.description}</p>
                  </Modal.Description>
                </div>
                <div className="modal-cart">
                  <Form>
                    <Form.Field>
                      <label>Quantity</label>
                      <input
                        type="text"
                        value={this.state.quantity}
                        onChange={this.setQuantity}
                      />
                    </Form.Field>
                  </Form>
                  <Button animated="vertical" onClick={this.addToCart}>
                    <Button.Content hidden>Add</Button.Content>
                    <Button.Content visible>
                      <Icon name="shop" />
                    </Button.Content>
                  </Button>
                </div>
              </Modal.Content>
            </Modal>
          </div>
        </Card.Content>
      </Card>
    )
  }
}

const mapState = state => ({
  user: state.user.currentUser,
  cart: state.cart.list
})

const mapDispatch = dispatch => ({
  postCartItem: (userId, cartObj) => dispatch(postCartItem(userId, cartObj)),
  setCartItems: (cartItems) => dispatch(setCartItems(cartItems))
})

export default connect(mapState, mapDispatch)(SingleProductCard)
