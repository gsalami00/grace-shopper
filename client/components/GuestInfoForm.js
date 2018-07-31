import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postUser} from '../store/user'
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

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.modal(false)
    this.props.postUser(this.state)
    // also add the cart items to the database!!!
    // and delete the local storage
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

})

const mapDispatch = dispatch => ({
  modal: bool => dispatch(modal(bool)),
  postUser: userDetails => dispatch(postUser(userDetails))
})

export default connect(mapState, mapDispatch)(GuestInfoForm)
