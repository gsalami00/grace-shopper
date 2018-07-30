import React from 'react'
import {Link} from 'react-router-dom'
import OrderHistoryItemCard from './OrderHistoryItemCard'
import {getOrderHistory} from '../../store'

const CheckoutSummaryCard = props => {
  const date = props.order.createdAt
  const formatted = new Date(JSON.parse(JSON.stringify(date)))
  return (
    <div className="ui segments order-history-main-container">
      <div className="order-history-container">
        <h4 className="ui block header">ORDER # {props.order.id} DETAILS</h4>
        <div className="order-history-table">
          <table className="ui definition table">
            <tbody>
              <tr>
                <td>
                  <h4>Order Placed</h4>
                </td>
                <td>{formatted.toString().substr(0, 16)}</td>
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
                  {props.order.user.firstName ? props.order.user.firstName : ''}{' '}
                  {props.order.user.lastName ? props.order.user.lastName : ''}
                  <br />
                  {props.order.user.address}
                </td>
              </tr>
              <tr>
                <td>
                  <h4>Order Total</h4>
                </td>
                <td>{props.order.total}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="order-history-products">
          {props.order['order-items'].map(item => (
            <OrderHistoryItemCard item={item} key={item.id} />
          ))}
        </div>
        <div className="clear" />
      </div>
    </div>
  )
}

export default CheckoutSummaryCard
