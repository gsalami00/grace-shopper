import React, {Component} from 'react';
import Checkout from './Checkout'
import {fetchCartItems} from '../store/cart'
import {connect} from 'react-redux'


class CheckoutPage extends Component {

  componentDidMount() {
    const {userId} = this.props
    this.props.fetchCartItems(userId);
  }

  render() {
    const {totalAmount, paid} = this.props;

    return (
      <div className="checkout-page">
        {!paid ?
          <div>
            <h2>Your total is: <em>{totalAmount}</em></h2>
            <Checkout />
          </div>
          :
          <h1>You paid successfully!</h1>}
      </div>
    );
  }
}

const mapState = state => ({
  cart: state.cart.list,
  totalAmount: state.cart.totalAmount,
  userId: state.user.currentUser.id,
  paid: state.cart.paid,
})

const mapDispatch = dispatch => ({
  fetchCartItems: (userId) => dispatch(fetchCartItems(userId)),
})

export default connect(mapState, mapDispatch)(CheckoutPage);

