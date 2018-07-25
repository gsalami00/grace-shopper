const Sequelize = require('sequelize');
const db = require('../db');

const cartItem = db.define('cart-item', {
  quantity: {
    type: Sequelize.INTEGER
  },
  paid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = cartItem;