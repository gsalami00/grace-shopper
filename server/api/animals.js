const router = require('express').Router()
const {Animal} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const animals = await Animal.findAll();
    res.json(animals);
  } catch (err) {
    next(err);
  }
})



