import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addCartItem} from '../store/cart'
import {Link} from 'react-router-dom'
import { Button, Icon, Label } from 'semantic-ui-react'

class NavCart extends Component {

  render() {
    const {count} = this.props;

    return (
      <Button as='div' labelPosition='right'>
        <Button icon>
          <Icon name='cart' />
          <Link to="/view-cart">Cart</Link>
        </Button>
        <Label as='a' basic>
          {count}
        </Label>
      </Button>
    )
  }

}

const mapState = (state, ownProps) => ({
  count: state.cart.count,
});

const mapDispatch = dispatch => ({
  addCartItem: cartItem => dispatch(addCartItem(cartItem)),
})

export default connect(mapState, mapDispatch)(NavCart);
