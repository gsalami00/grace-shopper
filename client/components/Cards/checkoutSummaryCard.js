import React, {Component} from 'react'

export default class checkoutSummaryCard extends Component {
  render() {
    return (
      <div class="ui card">
        <div class="content">
          <div class="header">Summary (insert # of items)</div>
        </div>
        <div class="content">
          <table class="ui definition table">
            <tbody>
              <tr>
                <td class="two wide column">Subtotal</td>
                <td>insert subtotal</td>
              </tr>
              <tr>
                <td>Shipping</td>
                <td>FREE</td>
              </tr>
              <tr>
                <td>Est. Taxes</td>
                <td>insert taxes</td>
              </tr>
              <tr>
                <td>TOTAL</td>
                <td>insert total</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="extra content">
          <button class="ui button">Join Project</button>
        </div>
      </div>
    )
  }
}
