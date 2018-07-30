import React, {Component} from 'react'
import ItemCartCard from './Cards/ItemCartCard'
import CheckoutSummaryCard from './Cards/checkoutSummaryCard'
import StripeCheckout from './StripeCheckout'
import {Elements, StripeProvider} from 'react-stripe-elements'
import {connect} from 'react-redux'
import {fetchCartItems} from '../store/cart'
import {postCartItem} from '../store/'
import {Button, Modal} from 'semantic-ui-react'
import EditProfileForm from './EditProfileForm'
import {modal} from '../store/forms'

class ViewCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: []
    }
  }

  async componentDidMount() {
    await this.setState({
      cart: this.props.cart
    })
    let localCart = localStorage.getItem('cart')
    if (localCart) {
      localCart = JSON.parse(localCart)
      const storeCart = this.state.cart
      const newCart = storeCart.concat(localCart)
      await this.setState({cart: newCart})
    }
  }
  render() {
    return (
      <div className="view-container">
        <div className="cart-card-container">
          {this.state.cart.map(cartItem => (
            <ItemCartCard key={cartItem.animal.id} cartItem={cartItem} />
          ))}
        </div>

        <div className="checkout-card-container">
          <CheckoutSummaryCard
            cart={this.state.cart}
            modal={this.props.modal}
          />
        </div>
        <div className="clear" />
      </div>
    )
  }
}
const mapDispatch = dispatch => ({
  postCartItem: cartObj => dispatch(postCartItem(cartObj)),
  modal: bool => dispatch(modal(bool))
})

const mapState = state => ({
  userId: state.user.currentUser.id,
  cart: state.cart.list,
  animals: state.animals,
  showModal: state.forms.showModal
})

export default connect(mapState, mapDispatch)(ViewCart)
