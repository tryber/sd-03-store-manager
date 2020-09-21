const productModel = require('../models/productModel');

const validateProductData = async (name, quantity) => {
  const nameExists = await productModel.getProductByName(name);
  switch (true) {
    case (typeof name !== 'string' || name.length < 5):
      return {
        error: true,
        err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
      };
    case nameExists:
      return {
        error: true,
        err: { code: 'invalid_data', message: 'Product already exists' },
      };
    case (quantity < 1):
      return {
        error: true,
        err: { code: 'invalid_data', message: '"quantity" must be larger than ou equal to 1' },
      };
    case (typeof quantity !== 'number'):
      return {
        error: true,
        err: { code: 'invalid_data', message: '"quantity" must be a number' },
      };
    default:
      return { error: false };
  }
};

const createProduct = async (name, quantity) => {
  const validation = validateProductData(name, quantity);
  if (validation.err) return validation;
  const product = await productModel.createProduct(name, quantity);
  return product;
};

const getAllProducts = async () => productModel.getAllProducts();

const getProductById = async (id) => {
  const product = await productModel.getProductById(id);
  if (!product) return { error: true, err: { code: 'invalid_data', message: 'Wrong id format' } };
  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};
