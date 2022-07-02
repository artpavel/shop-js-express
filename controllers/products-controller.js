const Product = require('../models/product-model');

// all product
const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render('customer/products/all-products', { products });
  } catch (error) {
    next(error);
  }
};

// show details product
const getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('customer/products/product-details', { product });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProduct,
  getProductDetails
};
