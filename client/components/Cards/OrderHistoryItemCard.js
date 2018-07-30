import React, {Component} from 'react'

export default class OrderHistoryItemCard extends Component {
  render() {
    return (
      <div className="ui items">
        <div className="item order-item-container">
          <div className="ui small image">
            <img src="https://i.imgur.com/XtmPr8U.jpg" />
          </div>
          <div className="content">
            <table className="ui striped table order-item">
              <tbody>
                <tr className="top aligned">
                  <td>
                    <h4>Item</h4>
                    Australorp
                  </td>
                  <td>
                    <h4>Quantity</h4>
                    7
                  </td>
                  <td className="top aligned">
                    <h4>Price per item</h4>
                    $900
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
