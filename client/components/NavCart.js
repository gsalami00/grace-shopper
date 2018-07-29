import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addCartItem} from '../store/cart'
import {Link} from 'react-router-dom'
import {Button, Icon, Label} from 'semantic-ui-react'

class NavCart extends Component {
  render() {
    const {count} = this.props

    return (
      <Button as="div" labelPosition="right" className="cart-nav-btn">
        <Button icon>
          <Icon name="cart" className="cart-nav-icon" />
          <Link to="/view-cart" className="cart-link">
            Cart
          </Link>
        </Button>
        <Label as="a" basic className="cart-count">
          {count}
        </Label>
      </Button>
    )
  }
}

const mapState = (state, ownProps) => ({
  count: state.cart.count
})

const mapDispatch = dispatch => ({
  addCartItem: cartItem => dispatch(addCartItem(cartItem))
})

export default connect(mapState, mapDispatch)(NavCart)
