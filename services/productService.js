const productModel = require('../models/productModel');

const validateProductData = async (name, quantity) => {
  const error = { err: true, code: 'invalid_data' };
  const nameExists = await productModel.getProductByName(name);
  switch (true) {
    case (typeof name !== 'string' || name.length < 5):
      return { error, message: '"name" length must be at least 5 characters long' };
    case (!!nameExists):
      return { error, message: 'Product already exists' };
    case (quantity < 1):
      return { error, message: '"quantity" must be larger than ou equal to 1' };
    case (typeof quantity !== 'number'):
      return { error, message: '"quantity" must be a number' };
    default:
      return { err: false };
  }
};

const createProduct = async (name, quantity) => {
  const validation = validateProductData(name, quantity);
  if (validation.err) return validation;
  const product = await productModel.createProduct(name, quantity);
  return product;
};

module.exports = {
  createProduct,
};
