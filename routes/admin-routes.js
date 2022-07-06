const express = require('express');
const adminController = require('../controllers/admin-controller');
const imageUploadMiddleware = require('../middlewares/image-upload')

const router = express.Router();

// all products
router.get('/products', adminController.getProducts);

// create new products
router.get('/products/new', adminController.getNewProduct);
// upload img product
router.post('/products', imageUploadMiddleware, adminController.createNewProduct)

// show and edit one product
router.get('/products/:id', adminController.getUpdateProduct);
router.post('/products/:id',imageUploadMiddleware, adminController.updateProduct);

// delete product
router.delete('/products/:id', adminController.deleteProduct)

router.get('/orders', adminController.getOrders);

router.patch('/orders/:id', adminController.updateOrder);

module.exports = router;