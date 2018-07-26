import React, {Component} from 'react'
import {Button, Icon} from 'semantic-ui-react'

export default class ViewProfile extends Component {
  render() {
    return (
      <div className="view-container">
        <div className="ui segments">
          <div className="ui segment">
            <h2 className="ui header">
              <i className="user circle icon" />
              <div className="content">John Smith</div>
            </h2>
          </div>
          <div className="ui segments">
            <table className="ui definition table">
              <tbody>
                <tr>
                  <td className="two wide column">Email</td>
                  <td>john@smith.com</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>123 Main St. Nowhere Land, OH 13579</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="edit-container">
            <Button animated="vertical">
              <Button.Content hidden>
                <Icon name="edit" />
              </Button.Content>
              <Button.Content visible>Edit Profile</Button.Content>
            </Button>
          </div>
          <div className="ui segment">
            <p className="order-history-title">Order History</p>
          </div>
          <div className="ui segment">
            <p>Insert Order History Here</p>
          </div>
        </div>
        <div className="centered-container">
          <button className="delete-profile">Delete my Profile</button>
        </div>
      </div>
    )
  }
}
