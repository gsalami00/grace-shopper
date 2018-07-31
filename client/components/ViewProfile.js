import React, {Component} from 'react'
import {Button, Icon, Modal} from 'semantic-ui-react'
import {fetchUser, editUser, deleteUserProfile} from '../store/user'
import {getOrderHistory} from '../store/order'
import {connect} from 'react-redux'
import EditProfileForm from './EditProfileForm'
import {modal} from '../store/forms'
import OrderHistoryCard from './Cards/OrderHistoryCard'

class ViewProfile extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId)
    this.props.getOrderHistory(this.props.match.params.userId)
  }

  render() {
    console.log(this.props.orders)
    return (
      <div className="view-container">
        <div className="ui segments">
          <div className="ui segment">
            <h2 className="ui header">
              <i className="user circle icon" />
              <div className="content">
                {this.props.currentUser.firstName}{' '}
                {this.props.currentUser.lastName}
              </div>
            </h2>
          </div>
          <div className="ui segments">
            <table className="ui definition table">
              <tbody>
                <tr>
                  <td className="two wide column">Email</td>
                  <td>{this.props.currentUser.email}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{this.props.currentUser.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="edit-container">
            <Modal
              open={this.props.showModal}
              trigger={
                <Button onClick={() => this.props.modal(true)}>
                  Edit Profile
                </Button>
              }
            >
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
                <EditProfileForm />
              </Modal.Content>
            </Modal>
          </div>

          <div className="ui segment">
            <h2 className="ui header">
              <i className="history icon" />
              <div className="content">Order History</div>
            </h2>
            {this.props.orders.map(order => (
              <OrderHistoryCard order={order} key={order.id} />
            ))}
          </div>
        </div>
        <div className="centered-container">
          <button
            onClick={() =>
              this.props.deleteUserProfile(
                this.props.currentUser.id,
                this.props.currentUser
              )
            }
            className="delete-profile"
          >
            Delete my Profile
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  currentUser: state.user.currentUser,
  showModal: state.forms.showModal,
  orders: state.order.orders
})
const mapDispatch = dispatch => ({
  fetchUser: () => dispatch(fetchUser),
  editUser: () => dispatch(editUser),
  modal: bool => dispatch(modal(bool)),
  deleteUserProfile: (userId, user) =>
    dispatch(deleteUserProfile(userId, user)),
  getOrderHistory: userId => dispatch(getOrderHistory(userId))
})

export default connect(mapState, mapDispatch)(ViewProfile)
