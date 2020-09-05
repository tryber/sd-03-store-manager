const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  quantity: Number,
});

const Product = mongoose.model('Product', productSchema);

async function getProductByName(name) {
  return Product.findOne({ name });
}

async function getProductById(id) {
  return Product.findById(id);
}

async function listProducts() {
  return Product.find();
}

async function updateProduct(id, { name, quantity }) {
  return Product.findByIdAndUpdate(id, { name, quantity }, { new: true });
}

async function createProduct({ name, quantity }) {
  const product = new Product({ name, quantity });
  return product.save();
}

async function deleteProduct(id) {
  return Product.findByIdAndDelete(id);
}

module.exports = {
  Product,
  createProduct,
  deleteProduct,
  getProductByName,
  listProducts,
  getProductById,
  updateProduct };
