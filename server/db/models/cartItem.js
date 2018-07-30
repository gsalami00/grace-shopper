const Sequelize = require('sequelize');
const db = require('../db');

const cartItem = db.define('cart-item', {
  quantity: {
    type: Sequelize.INTEGER
  },
  animalId: {
    type: Sequelize.INTEGER
  },
});

module.exports = cartItem;