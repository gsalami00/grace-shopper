const router = require('express').Router()
const { CartItem, User, Animal } = require('../db/models')
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
});

router.post('/', async (req, res, next) => {
  try {
    const newCartItem = await CartItem.create(req.body);
    res.status(201).json(newCartItem);
  } catch (err) {
    next(err)
  }
});
