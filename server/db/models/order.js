const Sequelize = require('sequelize')
const OrderItem = require('./orderItem')
const Animal = require('./animal')
const db = require('../db')

const Order = db.define('order', {
  total: {
    type: Sequelize.FLOAT
  }
})

Order.findTotal = async orderId => {
  const orderItems = await OrderItem.findAll({
    where: {
      orderId: orderId
    },
    include: [Animal]
  })
  const total = orderItems.reduce((acc, curr) => {
    return (
      Number(acc) +
      Number(curr.animal.price / 100).toFixed(2) * Number(curr.quantity)
    )
  }, 0)
  return (total.toFixed(2) * 1.08).toFixed(2)
}

module.exports = Order
