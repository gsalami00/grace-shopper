import React, {Component} from 'react'
import StripeCheckout from './StripeCheckout'
import BitcoinCheckout from './Cards/BitcoinCheckout'
import {Elements, StripeProvider} from 'react-stripe-elements';

export default class Checkout extends Component {

  render() {
    return (
      <StripeProvider apiKey="sk_test_FglRX3tkNhaVmQUzXQFrj2ZA">
        <div className="view-container">
          <Elements>
            <StripeCheckout />
          </Elements>
          <BitcoinCheckout/>
        </div>
      </StripeProvider>
    )
  }
}
