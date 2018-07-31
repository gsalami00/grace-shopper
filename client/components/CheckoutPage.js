import React, {Component} from 'react'
import Checkout from './Checkout'
import {fetchCartItems} from '../store/cart'
import {connect} from 'react-redux'
import {Modal} from 'semantic-ui-react'
import EditProfileForm from './EditProfileForm'
import {checkoutModal} from '../store/forms'

class CheckoutPage extends Component {
  async componentDidMount() {
    const {userId, currentUser} = this.props;
    await this.props.fetchCartItems(userId);
    (currentUser.address === '' || currentUser.address === undefined ? this.props.checkoutModal(true) : this.props.checkoutModal(false));
  }



  render() {
    const {totalAmount, paid, modal} = this.props
    // const this.props.currentUser.address === '' ||
    //     this.props.currentUser.address === undefined
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
              <div className="species-name">Please add an address before checking out</div>
            </Modal.Header>

            <Modal.Content>
              <EditProfileForm disabled={true} />
            </Modal.Content>
          </Modal>
        </div>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  cart: state.cart.list,
  totalAmount: state.cart.totalAmount,
  userId: state.user.currentUser.id,
  paid: state.cart.paid,
  currentUser: state.user.currentUser,
  modal: state.forms.checkoutModal,
})

const mapDispatch = dispatch => ({
  fetchCartItems: userId => dispatch(fetchCartItems(userId)),
  checkoutModal: bool => dispatch(checkoutModal(bool))
})

export default connect(mapState, mapDispatch)(CheckoutPage)
