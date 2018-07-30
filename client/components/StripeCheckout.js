import React, {Component} from 'react';
import {Button} from 'semantic-ui-react'
import {CardElement, injectStripe} from 'react-stripe-elements';
import {payCartItems} from '../store/cart'
import {connect} from 'react-redux'
import axios from 'axios';


class StripeCheckout extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    ev.preventDefault();
    const {userId} = this.props;
    let {token} = await this.props.stripe.createToken({name: "Name"});
    const res = await axios.post('/api/stripe/charge', {stripeToken: token.id });
    this.props.payCartItems(userId);
    console.log("response:", res);
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement className='card-element'/>
        <Button onClick={this.submit}>Send</Button>
      </div>
    );
  }
}

const mapState = state => ({
  userId: state.user.currentUser.id,
})

const mapDispatch = dispatch => ({
  payCartItems: userId => dispatch(payCartItems(userId)),
})

export default connect(mapState, mapDispatch)(injectStripe(StripeCheckout));

