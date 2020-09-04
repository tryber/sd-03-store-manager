const productModel = require('../models/productsModel');

const validateProduct = async (name, quantity) => {
  if (quantity < 1) {
    return {
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    };
  }
  if (typeof quantity !== 'number') {
    return { err: { code: 'invalid_data', message: '"quantity" must be a number' } };
  }
  if (name.length < 5) {
    return {
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    };
  }
  const checkNameProduct = await productModel.findByNameProduct(name);
  if (checkNameProduct) {
    return { err: { code: 'invalid_data', message: 'Product already exists' } };
  }
  return true;
};

const getAllStore = async () => {
  const listProduct = { products: await productModel.getAllStore() };

  return listProduct;
};

const findProductById = async (id) => {
  if (id.length < 24) return { err: { message: 'Wrong id format', code: 'invalid_data' } };
  const product = await productModel.findProductById(id);
  return product;
};

const createProduct = async ({ name, quantity }) => {
  const validation = await validateProduct(name, quantity);

  if (validation.err) return validation;
  return productModel.createProduct(name, quantity);
};

module.exports = { getAllStore, createProduct, findProductById };
