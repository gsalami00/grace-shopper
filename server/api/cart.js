const router = require('express').Router()
const {CartItem, User, Animal} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cartItems = await CartItem.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      where: {
        paid: false
      },
      include: [User, Animal]
    })
    res.json(cartItems);
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params;
    const cartItems = await CartItem.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      where: {
        userId: userId,
        paid: false
      },
      include: [User, Animal]
    })
    res.json(cartItems);
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {animal, quantity} = req.body.cartItem;
    const {userId} = req.body;
    let oldCartItem = await CartItem.findOne({
      where: {
        animalId: animal.id
      },
      include: [User, Animal]
    })

    if (oldCartItem) {
      let newQuantity = oldCartItem.quantity + quantity;
      oldCartItem = await oldCartItem.update({
        quantity: newQuantity
      })
      res.status(201).json(oldCartItem)
    } else {
      const newCartItem = await CartItem.create({
        quantity: quantity,
        userId: userId,
        animalId: animal.id,
      });
      res.status(201).json(newCartItem)
    }

  } catch (err) {
    next(err)
  }
});


