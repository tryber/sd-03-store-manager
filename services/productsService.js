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
  return false;
};

const getAllStore = async (database) => productModel.getAllStore(database);

const createProduct = async ({ name, quantity }) => {
  const validation = await validateProduct(name, quantity);

  if (validation.err) return validation;
  return productModel.createProduct(name, quantity);
};

module.exports = { getAllStore, createProduct };
