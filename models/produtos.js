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
 * Get a product by id
 * @param {number} id
 */
async function getProductById(id) {
  return Product.findById(id);
}
/**
 * List all products
 */
async function listProducts() {
  return Product.find();
}

/**
 * Update a product
 * @param {String} id
 * @param {{name:String,quantity:Number}} product
 */
async function updateProduct(id, { name, quantity }) {
  return Product.findByIdAndUpdate(id, { name, quantity }, { new: true });
}
/**
 * Create a new product to the database
 */
async function createProduct({ name, quantity }) {
  const product = new Product({ name, quantity });
  return product.save();
}

async function deleteProduct(id) {
  return Product.findByIdAndDelete(id);
}

module.exports = {
  createProduct,
  deleteProduct,
  getProductByName,
  listProducts,
  getProductById,
  updateProduct };
