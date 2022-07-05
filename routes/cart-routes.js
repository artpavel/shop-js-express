const express = require('express');

const cartController = require('../controllers/cart-controller');

const router = express.Router();

// show
router.get('/', cartController.getCart) // /cart

// add
router.post('/items', cartController.addCartItem); // /cart/items

// update
router.patch('/items', cartController.updateCartItem)

module.exports = router;