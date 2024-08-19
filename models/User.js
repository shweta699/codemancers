// models/User.js
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, enum: ['super_admin', 'user'], default: 'user' }
});
module.exports = mongoose.model('User', UserSchema);

// models/Product.js
const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String
});
module.exports = mongoose.model('Product', ProductSchema);

// models/Cart.js
const CartSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  products: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
  shippingAddress: String
});
module.exports = mongoose.model('Cart', CartSchema);
