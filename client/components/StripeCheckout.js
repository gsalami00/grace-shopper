import React, {Component} from 'react';
import {Button} from 'semantic-ui-react'
import {CardElement, injectStripe} from 'react-stripe-elements';

class StripeCheckout extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    ev.preventDefault();
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let response = await fetch("/charge", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id
    });

    if (response.ok) console.log("Purchase Complete!")
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

export default injectStripe(StripeCheckout);

