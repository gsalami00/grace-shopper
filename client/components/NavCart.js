import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addCartItem, fetchCartItems} from '../store/cart'
import {Link} from 'react-router-dom'
import {Button, Icon, Label} from 'semantic-ui-react'

class NavCart extends Component {
  componentDidMount() {
    const {userId} = this.props
    this.props.fetchCartItems(userId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartLength !== this.props.cartLength) {
      const {userId} = this.props
      this.props.fetchCartItems(userId)
    }
  }

  render() {
    const {cartLength} = this.props

    return (
      <Button as="div" labelPosition="right" className="cart-nav-btn">
        <Button icon>
          <Icon name="cart" className="cart-nav-icon" />
          <Link
            to={{pathname: '/view-cart', state: {prevPath: location.pathname}}}
            className="cart-link"
          >
            Cart
          </Link>
        </Button>
        <Label as="a" basic className="cart-count">
          {cartLength}
        </Label>
      </Button>
    )
  }
}

const mapState = (state, ownProps) => ({
  count: state.cart.count,
  cartLength: state.cart.list.length,
  userId: state.user.currentUser.id
})

const mapDispatch = dispatch => ({
  addCartItem: cartItem => dispatch(addCartItem(cartItem)),
  fetchCartItems: userId => dispatch(fetchCartItems(userId))
})

export default connect(mapState, mapDispatch)(NavCart)
