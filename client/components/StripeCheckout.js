import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {payCartItems} from '../store/cart'
import {connect} from 'react-redux'
import axios from 'axios'
import {getOrderHistory} from '../store/order'

class StripeCheckout extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    ev.preventDefault()
    const userId = (this.props.userId ? this.props.userId : JSON.parse(localStorage.getItem('user')).id);

    let {token} = await this.props.stripe.createToken({name: 'Name'})
    const res = await axios.post('/api/stripe/charge', {stripeToken: token.id})

    if(res) {
      console.log("this payment was successful", res)
      await this.props.payCartItems(userId)
      this.props.getOrderHistory(userId);

    } else {
      console.error("fuck! the payment didn't go through!");
    }
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement className="card-element" />
        <Button onClick={this.submit}>Send</Button>
      </div>
    )
  }
}

const mapState = state => ({
  userId: state.user.currentUser.id,
  orders: state.order.orders
})

const mapDispatch = dispatch => ({
  payCartItems: userId => dispatch(payCartItems(userId)),
  getOrderHistory: userId => dispatch(getOrderHistory(userId))
})

export default connect(mapState, mapDispatch)(injectStripe(StripeCheckout))
