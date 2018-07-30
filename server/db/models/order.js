const Sequelize = require('sequelize')
const OrderItem = require('./orderItem')
const Animal = require('./animal')
const db = require('../db')

const Order = db.define('order', {
  total: {
    type: Sequelize.INTEGER
  }
})

Order.findTotal = async orderId => {
  const orderItems = await OrderItem.findAll({
    where: {
      orderId: orderId
    },
    include: [Animal]
  })
  return orderItems.reduce((acc, curr) => {
    return (
      acc + Number((curr.animal.price / 100).toFixed(2)) * Number(curr.quantity)
    )
  }, 0)
}

module.exports = Order
