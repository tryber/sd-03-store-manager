const products = require('../models/productsModel');

const isProductValid = (name, quantity) => {
  if (typeof name !== 'string') {
    return {
      err: { code: 'invalid_data', message: '"name" must be a string' },
    };
  }

  if (typeof quantity !== 'number') {
    return {
      err: { code: 'invalid_data', message: '"quantity" must be a number' },
    };
  }

  if (!Number.isInteger(quantity)) {
    return {
      err: { code: 'invalid_data', message: '"quantity" must be an integer' },
    };
  }

  if (name.length < 5) {
    return {
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    };
  }

  if (quantity <= 0) {
    return {
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    };
  }
  if (products.getProductByName(name) !== null) {
    return {
      err: { code: 'invalid_data', message: 'Product already exists' },
    };
  }
};

const getAll = async () => {
  const result = await products.getAllProducts();
  return result;
};

const add = async (data) => {
  const { name, quantity } = data;

  const validation = isProductValid(name, quantity);

  if (validation.err) return validation;

  const product = await products.add(name, quantity);

  return product;
};

const getProductByName = async (name) => {
  const product = await products.getProductByName(name);

  return product;
};

module.exports = { add, getProductByName, getAll };
