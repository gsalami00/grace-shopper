import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setCartItems} from '../store/cart'
import {Link} from 'react-router-dom'
import {Button, Icon, Label} from 'semantic-ui-react'

class GuestNavCart extends Component {
  constructor() {
    super();
    this.state = {
      cartLength: 0
    }
  }
  async componentDidMount(){
    let localCart = localStorage.getItem("cart");
    if(localCart){
      localCart = JSON.parse(localCart);
      this.props.setCartItems(localCart)
    }
  }
  render() {
    console.log("this.state: ", this.state, "this.props: ", this.props)
    const { cartLength } = this.props
    return (
      <Button as="div" labelPosition="right" className="cart-nav-btn">
        <Button icon>
          <Icon name="cart" className="cart-nav-icon" />
          <Link
            to={{pathname: '/view-cart', state: {prevPath: location.pathname}}}
            className="cart-link"
          >
            Cart
          </Link>
        </Button>
        <Label as="a" basic className="cart-count">
          {cartLength}
        </Label>
      </Button>
    )
  }
}

const mapState = (state, ownProps) => ({
  cartLength: state.cart.count
})

const mapDispatch = dispatch => ({
  setCartItems: cart => dispatch(setCartItems(cart)),
})

export default connect(mapState, mapDispatch)(GuestNavCart)
