import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editUser, fetchUser} from '../store/user'
import {Button} from 'semantic-ui-react'
import {getOrderHistory} from '../store/order'

class AddNewUserForm extends Component {
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

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId)
    this.handleInitialize()
  }

  handleInitialize() {
    this.setState({
      firstName: this.props.currentUser.firstName,
      lastName: this.props.currentUser.lastName,
      email: this.props.currentUser.email,
      address: this.props.currentUser.address
    })
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.editUser(this.props.currentUser.id, this.state)
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
          {this.props.disabled && address === '' ? (
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
  currentUser: state.user.currentUser,
  orders: state.order.orders
})

const mapDispatch = dispatch => ({
  fetchUser: () => dispatch(fetchUser),
  editUser: (userId, user) => dispatch(editUser(userId, user)),
  getOrderHistory: userId => dispatch(getOrderHistory(userId))
})

export default connect(mapState, mapDispatch)(AddNewUserForm)
