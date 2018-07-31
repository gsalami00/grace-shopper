import React, {Component} from 'react'
import ItemCartCard from './Cards/ItemCartCard'
import CheckoutSummaryCard from './Cards/checkoutSummaryCard'
import StripeCheckout from './StripeCheckout'
import {Elements, StripeProvider} from 'react-stripe-elements'
import {connect} from 'react-redux'
import {setOneCartItem} from '../store/cart'

class ViewCart extends Component {
  async componentDidMount() {
    let localCart = localStorage.getItem('cart')
    if (localCart && !this.props.user.id) {
      localCart = JSON.parse(localCart)
      localCart.forEach(cartItem => {
        console.log(cartItem)
        cartItem['animalId'] = cartItem.animal.id
        cartItem['id'] = cartItem.animal.id
        this.props.setOneCartItem(cartItem)
      });
    }
  }
  render() {
    return (
      <div className="view-container">
        <div className="cart-card-container">
          {this.props.cart.map(cartItem => (
            <ItemCartCard key={cartItem.animalId} cartItem={cartItem} />
          ))}
        </div>
        <div className="checkout-card-container">
          <CheckoutSummaryCard />
        </div>
        <div className="clear" />
      </div>
    )
  }
}
const mapDispatch = dispatch => ({
  setOneCartItem: cartItem => dispatch(setOneCartItem(cartItem)),
  modal: bool => dispatch(modal(bool))
})

const mapState = state => ({
  user: state.user.currentUser,
  cart: state.cart.list,
  animals: state.animals,
  showModal: state.forms.showModal
})

export default connect(mapState, mapDispatch)(ViewCart)
