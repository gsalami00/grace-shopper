import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editUser, guestAuth} from '../store/user'
import {postCartItem} from '../store/cart'
import {modal} from '../store/forms'
import {Button} from 'semantic-ui-react'

class UserSignUp extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const localUser = localStorage.getItem('user')
    if (localUser !== 'guest' && localUser) {
      const user = JSON.parse(localStorage.getItem('user'))
      this.handleInitialize(user)
    }
  }

  handleInitialize(user) {
    this.setState({
      user: user,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      email: user.email,
      password: user.password
    })
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    const {user, email, password} = this.state
    const formName = 'signup'
    await this.props.guestAuth(user.id, email, password, formName)
    this.props.history.push(`/users/${user.id}`)
    localStorage.removeItem('user')
  }

  render() {
    const {email, password} = this.state

    return (
      <div className="guest-join">
        <h2 className="ui header">
          <i className="edit icon" />
          <div className="content">
            You're one step away...just enter a password to create an account!
          </div>
        </h2>

        <form onSubmit={this.handleSubmit}>
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
            <label className="edit-profile-label">Password</label>
            <input
              className="edit-profile-input"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          {email === '' || password === '' ? (
            <Button className="disabled edit-profile-save-changes-btn">
              Sign up!
            </Button>
          ) : (
            <Button className="edit-profile-save-changes-btn">Sign up!</Button>
          )}
        </form>
      </div>
    )
  }
}

const mapState = (state, ownProps) => ({
  history: ownProps.history
})

const mapDispatch = dispatch => ({
  editUser: userDetails => dispatch(editUser(userDetails)),
  guestAuth: (userId, email, password, method) =>
    dispatch(guestAuth(userId, email, password, method))
})

export default connect(mapState, mapDispatch)(UserSignUp)
