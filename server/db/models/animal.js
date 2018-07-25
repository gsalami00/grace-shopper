const Sequelize = require('sequelize');
const db = require('../db');

const Animal = db.define('animal', {
  species: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.NUMBER
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: "http://www.cutestpaw.com/wp-content/uploads/2014/03/Baby-farm-animals.jpg",
    validate: {
      isUrl: true
    }
  }
});

module.exports = Animal;