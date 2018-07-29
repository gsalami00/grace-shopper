import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editUser, fetchUser} from '../store/user'
import {modal} from '../store/forms'
import {Button} from 'semantic-ui-react'

class EditProfileForm extends Component {
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
    evt.preventDefault();
    this.props.modal(false)
    this.props.editUser(this.props.currentUser.id, this.state)
  }

  render() {
    const {firstName, lastName, email, address} = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={this.handleChange}
          />

          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
          />

          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />

          <label>Address</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={this.handleChange}
          />

          <Button className="edit-profile-save-changes-btn">
            Save Changes
          </Button>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  currentUser: state.user.currentUser
})

const mapDispatch = dispatch => ({
  fetchUser: () => dispatch(fetchUser),
  editUser: (userId, user) => dispatch(editUser(userId, user)),
  modal: bool => dispatch(modal(bool))
})

export default connect(mapState, mapDispatch)(EditProfileForm)
