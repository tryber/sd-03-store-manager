const productModel = require('../models/productModel');

const handleCreateProduct = async (name, quantity) => {
  const product = await productModel.findProductByName(name);
  if (product) return { error: true, message: 'product already exists' };
  return productModel.createProduct(name, quantity);
};

module.exports = {
  handleCreateProduct,
};
