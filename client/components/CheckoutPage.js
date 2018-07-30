import React, {Component} from 'react';
import {Button} from 'semantic-ui-react'
import StripeCheckout from './StripeCheckout'
import {fetchCartItems} from '../store/cart'
import axios from 'axios';
import {connect} from 'react-redux'


class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paid: false,
    }
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const {userId} = this.props
    this.props.fetchCartItems(userId);
  }

  render() {
    const {totalAmount} = this.props;

    return (
      <div className="checkout-page">
        {this.state.paid ?
          <div>
            <h2>Your total is {totalAmount}</h2>
            <StripeCheckout />
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
  userId: state.user.currentUser.id
})

const mapDispatch = dispatch => ({
  fetchCartItems: (userId) => dispatch(fetchCartItems(userId)),
})

export default connect(mapState, mapDispatch)(CheckoutPage);

