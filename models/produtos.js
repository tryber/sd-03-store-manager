const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/StoreManager', { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  quantity: Number,
});

const Product = mongoose.model('Product', productSchema);

/**
 * Get a product by name
 * @param {String} name
 */
async function getProductByName(name) {
  return Product.findOne({ name });
}

/**
 * Create a new product to the database
 */
async function createProduct({ name, quantity }) {
  console.log(name, quantity);
  const product = new Product({ name, quantity });
  return product.save();
}

module.exports = { createProduct, getProductByName };
