const router = require('express').Router()
const {User, OrderItem, Order} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId
      },
      include: [User, OrderItem]
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})
