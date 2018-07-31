import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postUser} from '../store/user'
import {postCartItem} from '../store/cart'
import {modal} from '../store/forms'
import {Button} from 'semantic-ui-react'

class GuestInfoForm extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    const {cart} = this.props;
    this.props.modal(false)
    const newUser = await this.props.postUser(this.state);
    await Promise.all(cart.map(cartItem => {
      return this.props.postCartItem(newUser.id, cartItem);
    }));
    localStorage.removeItem('cart');
    localStorage.setItem('user', JSON.stringify(newUser));
  }

  render() {
    const {firstName, lastName, email, address} = this.state

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="edit-profile-set-fields">
            <label className="edit-profile-label">First Name</label>
            <input
              className="edit-profile-input"
              type="text"
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
            />
          </div>
          <div className="edit-profile-set-fields">
            <label className="edit-profile-label">Last Name</label>
            <input
              className="edit-profile-input"
              type="text"
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
            />
          </div>
          <div className="edit-profile-set-fields">
            <label className="edit-profile-label">Email</label>
            <input
              className="edit-profile-input"
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div className="edit-profile-set-fields">
            <label className="edit-profile-label">Address</label>
            <input
              className="edit-profile-input"
              type="text"
              name="address"
              value={address}
              onChange={this.handleChange}
            />
          </div>
          {!this.props.disabled || address === '' || firstName === '' || lastName === '' || email === '' ? (
            <Button className="disabled edit-profile-save-changes-btn">
              Save Changes
            </Button>
          ) : (
            <Button className="edit-profile-save-changes-btn">
              Save Changes
            </Button>
          )}
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart.list,
})

const mapDispatch = dispatch => ({
  modal: bool => dispatch(modal(bool)),
  postUser: userDetails => dispatch(postUser(userDetails)),
  postCartItem: (userId, cartItem) => dispatch(postCartItem(userId, cartItem)),
})

export default connect(mapState, mapDispatch)(GuestInfoForm)
