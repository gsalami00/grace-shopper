import React from 'react'
import OrderHistoryCard from './Cards/OrderHistoryCard'

const CheckoutSuccess = ({orders}) => {
  if(orders.length) {
    const mostRecentId = orders.reduce((max, curr) => {
      return (curr.id > max ? curr.id : max);
    }, orders[0].id);
    var mostRecent = orders.find(order => order.id === mostRecentId);
  } else {
    mostRecent = {};
  }

  return (
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
              order={mostRecent}
              key={mostRecent.id}
              status={false}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}


export default CheckoutSuccess
