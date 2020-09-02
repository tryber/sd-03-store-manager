const productModel = require('../models/productModel');
const {
  PRODUCT_ALREADY_EXISTS,
  errMessage,
} = require('./errorsServices');

const handleCreateProduct = async (name, quantity) => {
  const product = await productModel.findProductByName(name);

  if (product) return { error: true, message: errMessage('invalid_data', PRODUCT_ALREADY_EXISTS) };
  return productModel.createProduct(name, quantity);
};

module.exports = {
  handleCreateProduct,
};
