import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import CoinbaseCommerceButton from 'react-coinbase-commerce';
import axios from 'axios'

export default class BitcoinCheckout extends Component {

  async handleSubmit() {
    axios.post('https://test.bitpay.com/checkout')
  }

  render() {
    return (
        <div className="crypto">
          <a class="buy-with-crypto"
             href="https://commerce.coinbase.com/checkout/25e0e8c0-9b37-4703-8a27-809e31b7ef53">
            <Button
              size='small'
              color='green'>
            <span>Or...buy with Crypto</span>
            </Button>
          </a>
          <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807">
          </script>
        </div>
    )
  }
}

