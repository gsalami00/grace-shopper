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
        paid: false,
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
        animalId: animal.id,
        paid: false,
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

router.put('/checkout/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params;
    const newOrder = await Order.create({
        userId: userId,
    });

    const userCartItems = await CartItem.findAll({
      where: {
        userId: userId,
      },
      include: [User, Animal]
    });

    await Promise.all(userCartItems.map(async cartItem => {
      const total = (cartItem.quantity * (cartItem.animal.price/100));
      const item = await OrderItem.create({
        quantity: cartItem.quantity,
        total,
        orderId: newOrder.id,
        animalId: cartItem.animal.id,
      });
      return item;
    }));


    const total = await Order.findTotal(newOrder.id);
    await Order.update(
      { total },
      { where : {
        id: newOrder.id
      }}
    );

    await CartItem.destroy({
      where: {
        userId: userId,
      }
    });

    res.status(201)
  } catch (err) {
    next(err)
  }
})


