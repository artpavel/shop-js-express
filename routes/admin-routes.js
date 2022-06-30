const express = require('express');
const adminController = require('../controllers/admin-controller');

const router = express.Router();

// all products
router.get('/products', adminController.getProducts);

// create new products
router.get('/products/new', adminController.getNewProduct);


module.exports = router;