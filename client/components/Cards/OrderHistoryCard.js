import React from 'react'
import {Link} from 'react-router-dom'
import OrderHistoryItemCard from './OrderHistoryItemCard'

const CheckoutSummaryCard = props => {
  return (
    <div className="ui segments order-history-main-container">
      <div className="order-history-container">
        <h4 className="ui block header">ORDER # 1 DETAILS</h4>
        <div className="order-history-table">
          <table className="ui definition table">
            <tbody>
              <tr>
                <td>
                  <h4>Order Placed</h4>
                </td>
                <td>July 2, 2018</td>
              </tr>
              <tr>
                <td>
                  <h4>Order Status</h4>
                </td>
                <td>Delivered</td>
              </tr>
              <tr>
                <td>
                  <h4>Ship To</h4>
                </td>
                <td>
                  Gini Salamat<br />
                  123 Chinchilla Road, Fluffy City, OH 18987
                </td>
              </tr>
              <tr>
                <td>
                  <h4>Order Total</h4>
                </td>
                <td>$1000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="order-history-products">
          <OrderHistoryItemCard />
          <OrderHistoryItemCard />
          <OrderHistoryItemCard />
        </div>
        <div className="clear" />
      </div>
    </div>
  )
}

export default CheckoutSummaryCard
