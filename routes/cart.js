const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) return res.send([]);
  res.send(cart.products);
});

router.post('/', async (req, res) => {
  const productId = req.body.productId;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).send('Product not found.');
  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) {
    const newCart = new Cart({ userId: req.user._id, products: [product] });
    await newCart.save();
  } else {
    cart.products.push(product);
    await cart.save();
  }
  res.send('Product added to cart successfully.');
});

module.exports = router;