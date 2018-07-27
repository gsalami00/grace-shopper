import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Icon, Image, Button, Modal, Form} from 'semantic-ui-react'
import {postCartItem} from '../../store/'

class SingleProductCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      quantity: ''
    }
    this.setQuantity = this.setQuantity.bind(this);
    this.addToCart = this.addToCart.bind(this);
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
    console.log(event.target)
    await this.setState({
      quantity: event.target.value
    })
    console.log(this.state)
  }
  addToCart() {
    if (!localStorage.getItem('user')) {
      this.props.postCartItem({
        animal: this.props.animal,
        quantity: parseInt(this.state.quantity)
      })
    } else {
      const cart = localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : []
      cart.push({
        animal: this.props.animal,
        quantity: parseInt(this.state.quantity)
      })
      const stringifiedCart = JSON.stringify(cart)
      localStorage.setItem('cart', stringifiedCart)
    }
  }
  render() {
    const price = (this.props.animal.price / 100).toFixed(2)
    return (
      <Card className="single-card-tile">
        <Image src={this.props.animal.imageUrl} />
        <Card.Content>
          <Card.Header>{this.props.animal.species}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <span>${price}</span>
          <div className="right-aligned-button">
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

const mapDispatch = dispatch => ({
  postCartItem: cartObj => dispatch(postCartItem(cartObj))
})

export default connect(null, mapDispatch)(SingleProductCard)
