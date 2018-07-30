import React, {Component} from 'react'
import Checkout from './Checkout'
import {fetchCartItems} from '../store/cart'
import {connect} from 'react-redux'
import {Button, Modal} from 'semantic-ui-react'
import EditProfileForm from './EditProfileForm'
import {modal} from '../store/forms'

class CheckoutPage extends Component {
  componentDidMount() {
    const {userId} = this.props
    this.props.fetchCartItems(userId)
  }

  render() {
    const {totalAmount, paid} = this.props
    console.log(this.props.location.pathname)
    return (
      <React.Fragment>
        {this.props.currentUser.address === '' ||
        this.props.currentUser.address === undefined ? (
          <div className="edit-container">
            <Modal open={() => this.props.modal(true)}>
              <Modal.Header>
                <div className="species-name">Edit Profile</div>
                <i
                  id="exit-modal"
                  className="modal-close window close icon"
                  onClick={() => this.props.modal(false)}
                />
                <div className="clear" />
              </Modal.Header>
              <Modal.Content>
                <EditProfileForm disabled={true} />
              </Modal.Content>
            </Modal>
          </div>
        ) : (
          ''
        )}
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
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  cart: state.cart.list,
  totalAmount: state.cart.totalAmount,
  userId: state.user.currentUser.id,
  paid: state.cart.paid,
  currentUser: state.user.currentUser
})

const mapDispatch = dispatch => ({
  fetchCartItems: userId => dispatch(fetchCartItems(userId)),
  modal: bool => dispatch(modal(bool))
})

export default connect(mapState, mapDispatch)(CheckoutPage)
