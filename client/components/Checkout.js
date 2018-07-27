import React, {Component} from 'react'
import StripeCheckout from './StripeCheckout'
import {Elements, StripeProvider} from 'react-stripe-elements';

export default class Checkout extends Component {

  render() {
    return (
      <StripeProvider apiKey='pk_test_mH9owMXZgL6LHAojYWGhZY5Q'>
        <div className="view-container">
          <Elements>
            <StripeCheckout />
          </Elements>
        </div>
      </StripeProvider>
    )
  }
}
