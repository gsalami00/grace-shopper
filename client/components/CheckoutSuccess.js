import React from 'react'
import OrderHistoryCard from './Cards/OrderHistoryCard'

const CheckoutSuccess = ({orders}) => (
  <div className="view-container">
    <div className="ui segments">
      <div className="ui segment">
        <h2 className="ui header">
          <br />
          <i className="check circle icon" />
          <div className="content">
            You paid successfully! Here is your order information:
          </div>
        </h2>
        {orders.length ? (
          <OrderHistoryCard
            order={orders[orders.length - 1]}
            key={orders[orders.length - 1].id}
            status={false}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  </div>
)

export default CheckoutSuccess
