import React, {Component} from 'react'
import Checkout from './Checkout'
import {fetchCartItems} from '../store/cart'
import {connect} from 'react-redux'
import {Modal} from 'semantic-ui-react'
import GuestInfoForm from './GuestInfoForm'
import {checkoutModal} from '../store/forms'

class GuestCheckoutPage extends Component {

  componentDidMount() {

  }

  componentDidUpdate() {
    const localUser = localStorage.getItem('user')
    if(localUser !== 'guest' && !localUser) {
      const userId = JSON.parse(localStorage.getItem('user')).id;
      this.props.fetchCartItems(userId);
    }
  }

  render() {
    const {totalAmount, paid, modal} = this.props

    return (
      <React.Fragment>
        <div className="checkout-page">
          {!paid ? (
            <div>
              <h2>
                Your total is: <em>{totalAmount}</em>
              </h2>
              <Checkout />
            </div>
          ) : (
            <h1>You paid successfully!</h1>
          )}


        </div>

        <div className="edit-container">
          <Modal open={modal}>
            <Modal.Header>
              <div className="species-name">Give us your fucking data!!!</div>
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

const mapState = state => ({
  totalAmount: state.cart.totalAmount,
  paid: state.cart.paid,
  modal: state.forms.checkoutModal,
  user: state.user.currentUser,
})

const mapDispatch = dispatch => ({
  checkoutModal: bool => dispatch(checkoutModal(bool)),
  fetchCartItems: () => dispatch(fetchCartItems()),
})

export default connect(mapState, mapDispatch)(GuestCheckoutPage)
