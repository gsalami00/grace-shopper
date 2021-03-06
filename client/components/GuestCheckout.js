import React, {Component} from 'react'
import Checkout from './Checkout'
import {fetchCartItems} from '../store/cart'
import {connect} from 'react-redux'
import {Modal} from 'semantic-ui-react'
import GuestInfoForm from './GuestInfoForm'
import CheckoutSuccess from './CheckoutSuccess'
import UserSignup from './UserSignUp'
import {checkoutModal} from '../store/forms'

class GuestCheckoutPage extends Component {
  componentDidMount() {
    const localUser = localStorage.getItem('user')
    if (localUser !== 'guest' && localUser) {
      const userId = JSON.parse(localStorage.getItem('user')).id
      this.props.fetchCartItems(userId)
      this.props.checkoutModal(false)
    }
  }

  componentDidUpdate() {
    const localUser = localStorage.getItem('user')
    if (localUser !== 'guest' && localUser) {
      const userId = JSON.parse(localStorage.getItem('user')).id
      this.props.checkoutModal(false)
    }
  }

  render() {
    const {totalAmount, paid, modal, orders} = this.props

    return (
      <React.Fragment>
        <div className="checkout-page-success">
          {!paid ? (
            <div className="ui segments">
              <div className="ui segment">
                <h2 className="ui header">
                  <i className="credit card icon" />
                  <div className="content">
                    Your total is: <em>${totalAmount}</em>
                  </div>
                </h2>

                <Checkout />
              </div>
            </div>
          ) : (
            <div className="ui segments">
              <div className="ui segment">
                <UserSignup history={this.props.history} />
                <CheckoutSuccess orders={orders} />
              </div>
            </div>
          )}
        </div>

        <div className="edit-container">
          <Modal open={modal}>
            <Modal.Header>
              <div className="species-name">
                Please fill in the fields below to complete your checkout.
              </div>
            </Modal.Header>

            <Modal.Content>
              <GuestInfoForm disabled={true} />
            </Modal.Content>
          </Modal>
        </div>
      </React.Fragment>
    )
  }
}

const mapState = (state, ownProps) => ({
  totalAmount: state.cart.totalAmount,
  paid: state.cart.paid,
  modal: state.forms.checkoutModal,
  user: state.user.currentUser,
  orders: state.order.orders,
  history: ownProps.history
})

const mapDispatch = dispatch => ({
  checkoutModal: bool => dispatch(checkoutModal(bool)),
  fetchCartItems: () => dispatch(fetchCartItems())
})

export default connect(mapState, mapDispatch)(GuestCheckoutPage)
