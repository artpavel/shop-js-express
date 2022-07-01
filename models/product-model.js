/**
 * for admin create product
 * */
const db = require('../data/database');
const mongodb = require('mongodb');

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image; // the name of the image file
    this.imagePath = `product-data/images/${ productData.image }`;
    this.imageUrl = `/products/assets/images/${ productData.image }`;
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  // for edit product admin
  static async findById(productId) {
    let prodId;
    try {
      prodId = new mongodb.ObjectId(productId);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const product = await db
      .getDb()
      .collection('products')
      .findOne({ _id: prodId });

    if (!product) {
      const error = new Error('Could not find product with provided id.');
      error.code = 404;
      throw error;
    }

    return new Product(product);
  }

  // show products in panel admin
  static async findAll() {
    const products = await db.getDb().collection('products').find().toArray();

    return products.map(productDocument => new Product(productDocument));
  }

  // add in the database
  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image
    };

    await db.getDb().collection('products').insertOne(productData);
  }
}

module.exports = Product;