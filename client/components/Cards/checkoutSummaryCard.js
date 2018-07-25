import React from 'react'

const CheckoutSummaryCard = (props) => {
  return (
    <div className="ui card">
      <div className="content">
        <div className="header">Summary (insert # of items)</div>
      </div>
      <div className="content">
        <table className="ui definition table">
          <tbody>
            <tr>
              <td className="two wide column">Subtotal</td>
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
      <div className="extra content">
        <button className="ui button">Checkout</button>
      </div>
    </div>
  )
}


export default CheckoutSummaryCard
