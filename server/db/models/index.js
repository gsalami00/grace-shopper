const User = require('./user');
const Animal = require('./animal');
const CartItem = require('./cartItem');
const OrderItem = require('./orderItem');
const Order = require('./order')

CartItem.belongsTo(User);
User.hasMany(CartItem);

CartItem.belongsTo(Animal);
Animal.hasMany(CartItem);

OrderItem.belongsTo(Animal);
Animal.hasMany(OrderItem);

OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);

Order.belongsTo(User);
User.hasMany(Order);

 module.exports = {
  User,
  Animal,
  CartItem,
  OrderItem,
  Order
};
