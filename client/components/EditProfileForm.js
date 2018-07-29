import React, {Component} from 'react'
import {Field, reduxForm, initialize} from 'redux-form'
import {connect} from 'react-redux'
import RenderField from './RenderField'
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
    this.setState({
      firstName: this.props.currentUser.firstName,
      lastName: this.props.currentUser.lastName,
      email: this.props.currentUser.email,
      address: this.props.currentUser.address
    })
  }

  handleInitialize() {
    const initData = {
      firstName: this.props.currentUser.firstName,
      lastName: this.props.currentUser.lastName,
      email: this.props.currentUser.email,
      address: this.props.currentUser.address
    }
    this.props.initialize(initData)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  handleSubmit() {
    this.props.fetchUser()
    this.props.modal(true)
    this.props.editUser(this.props.currentUser.id, this.state)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Field
            name="firstName"
            type="firstName"
            component={RenderField}
            label="First Name"
            onChange={this.handleChange}
          />
          <Field
            name="lastName"
            type="lastName"
            component={RenderField}
            label="Last Name"
            onChange={this.handleChange}
          />
          <Field
            name="email"
            type="email"
            component={RenderField}
            label="Email"
            onChange={this.handleChange}
          />
          <Field
            name="address"
            type="text"
            component={RenderField}
            label="Address"
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

const form = reduxForm({
  enableReinitialize: true,
  destroyOnUnmount: false,
  form: 'EditProfileForm'
})

const mapState = state => ({
  currentUser: state.user.currentUser
})

const mapDispatch = dispatch => ({
  fetchUser: () => dispatch(fetchUser),
  editUser: (userId, user) => dispatch(editUser(userId, user)),
  modal: bool => dispatch(modal(bool))
})

export default connect(mapState, mapDispatch)(form(EditProfileForm))
