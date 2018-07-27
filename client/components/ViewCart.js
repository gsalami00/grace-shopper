import React, {Component} from 'react'
import ItemCartCard from './Cards/ItemCartCard'
import CheckoutSummaryCard from './Cards/checkoutSummaryCard'
import StripeCheckout from './StripeCheckout'
import {Elements, StripeProvider} from 'react-stripe-elements';

export default class ViewCart extends Component {
  render() {
    return (
        <div className="view-container">
          <div className="cart-card-container">
            <ItemCartCard />
          </div>
          <div className="checkout-card-container">
            <CheckoutSummaryCard />
          </div>
          <div className="clear" />
        </div>
    )
  }
}
