import React, {Component} from 'react'
import {Modal} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class BitcoinCheckout extends Component {

  async handleSubmit() {
    axios.post('https://test.bitpay.com/checkout')
  }

  render() {
    return (
      <div className="bitcoin-checkout">
        <form action="https://test.bitpay.com/checkout" method="post" >
          <input type="hidden" name="action" value="checkout" />
          <input type="hidden" name="posData" value="" />
          <input
            type="hidden"
            name="data"
            value="G1X5xmLpiYkskppO62mi2Cuk6EJ9xnNQaRbNj2drL20AZbaj1DUOKFYoNpM8z2se+MzpFVqL7/2e51VrPGLNvWrddWljKuo8XdFHxlV4F9M71n133b7J4Ch0FB5TDEoWSC++O9TfVf9q7DOlFpT5hvr2cU6/9IrtFPKiIcxK1nHXVLQkHsOTrz9dxVqTwS5ani9q7q1xokHcNiLWLqL/QOlc2SItVhTFFbAPx+wxR6EcJrvnedRL/+zttLXOozyZ"
          />
          <input type="image" src="https://test.bitpay.com/cdn/en_US/bp-btn-pay-currencies.svg" name="submit" alt="BitPay, the easy way to pay with bitcoins." />
        </form>
      </div>
    )
  }
}

