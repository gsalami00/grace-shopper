import React, {Component} from 'react'
import StripeCheckout from './StripeCheckout'
import BitcoinCheckout from './Cards/BitcoinCheckout'
import {Elements, StripeProvider} from 'react-stripe-elements';

export default class Checkout extends Component {

  render() {
    const stripe = process.env.STRIPE_CLIENT_TEST_KEY || null

    return (
      <StripeProvider apiKey={stripe}>
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
