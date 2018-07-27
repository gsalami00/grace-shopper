const router = require('express').Router()
const {CartItem, User, Animal} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const cartItems = await CartItem.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      where: {
        paid: false,
        userId: req.params.userId
      },
      include: [Animal]
    })
    res.json(cartItems)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let oldCartItem = await CartItem.findOne({where: {animalId: req.body.animal.id}})
    if (oldCartItem) {
      let newQuantity = oldCartItem.quantity + req.body.quantity;
      oldCartItem = await oldCartItem.update({
        quantity: newQuantity
      })
      res.status(201).json(oldCartItem)
    } else {
      const newCartItem = await CartItem.create({
        animalId: req.body.animal.id,
        quantity: req.body.quantity
      })
      res.status(201).json(newCartItem)
    }
  } catch (err) {
    next(err)
  }
})
