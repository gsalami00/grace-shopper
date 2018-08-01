const router = require('express').Router()
const {CartItem, User, Animal, OrderItem, Order} = require('../db/models')
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
    res.json(cartItems)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = (req.user ? req.user.id : Number(req.params.userId))
    if (userId !== Number(req.params.userId)) {
      console.log('why the fuck')
      res.status(403).send()
    } else {
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
      res.json(cartItems)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {animal, quantity} = req.body.cartItem
    const userId = (req.user ? req.user.id : req.body.userId)
    let oldCartItem = await CartItem.findOne({
      where: {
        animalId: animal.id,
        userId: userId,
        paid: false
      },
      include: [User, Animal]
    })

    if (oldCartItem) {
      let newQuantity = oldCartItem.quantity + quantity
      oldCartItem = await oldCartItem.update({
        quantity: newQuantity
      })
      res.status(201).json(oldCartItem)
    } else {
      const newCartItem = await CartItem.create({
        quantity: quantity,
        userId: userId,
        animalId: animal.id
      })
      res.status(201).json(newCartItem)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const {animal, quantity} = req.body.cartItem
    const userId = (req.user ? req.user.id : req.body.userId)

    const cartItem = await CartItem.findOne({
      where: {
        userId: userId,
        animalId: animal.id,
        paid: false,
      }
    });

    await cartItem.update({
      quantity
    });

    res.status(201).json(cartItem);
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId/:animalId', async (req, res, next) => {
  try {
    if (req.user.id !== Number(req.params.userId)) res.status(403).send()
    const itemToDelete = await CartItem.findOne({
      where: {
        userId: req.user.id,
        animalId: req.params.animalId
      }
    })
    await itemToDelete.destroy()
    res.status(201).send()
  } catch (err) {
    next(err)
  }
})

router.put('/checkout/:userId', async (req, res, next) => {
  try {
    const userId = (req.user ? req.user.id : Number(req.params.userId))
    if (userId !== Number(req.params.userId)) res.status(403).send()
    else {
      const newOrder = await Order.create({
        userId: userId
      })

      const userCartItems = await CartItem.findAll({
        where: {
          userId: userId
        },
        include: [User, Animal]
      })

      await Promise.all(
        userCartItems.map(async cartItem => {
          const total = cartItem.quantity * (cartItem.animal.price / 100)
          const item = await OrderItem.create({
            quantity: cartItem.quantity,
            total,
            orderId: newOrder.id,
            animalId: cartItem.animal.id
          })
          return item
        })
      )

      const total = await Order.findTotal(newOrder.id)
      await Order.update(
        {total},
        {
          where: {
            id: newOrder.id
          }
        }
      )

      await CartItem.destroy({
        where: {
          userId: userId
        }
      })

      res.sendStatus(201)
    }
  } catch (err) {
    next(err)
  }
})
