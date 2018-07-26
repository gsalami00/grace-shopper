const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router


// router.get('/findAllUsers', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and email fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'firstName', 'lastName', 'email', 'address']
//     })
//     res.json(users);
//   } catch (err) {
//     next(err);
//   }
// })

router.get('/:userId', async(req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
})



router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users);
  } catch (err) {
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
})

router.put('/:userId', async(req, res, next) => {
  try {
    await User.update(req.body, {
      where: {
        id: req.params.userId
      }
    })
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
})


router.delete('/:userId', async (req, res, next) => {
  try {
    await User.destroy({where: {
      id: req.params.userId
    }})
    res.send("Successfully deleted.")
  } catch (error) {
    next(error);
  }
})
