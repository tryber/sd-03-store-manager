const Products = require('../models/products');

const validadeProduct = (name, quantity) => {
  const err = { code: 'invalid_data' };
  switch (true) {
    case quantity < 1:
      err.message = '"name" length must be at least 5 characters long';
      break;
    case !Number.isInteger(quantity):
      err.message = '"name" length must be at least 5 characters long';
      break;
    case typeof quantity === 'string':
      err.message = '"quantity" must be a number';
      break;
    case !Object.keys(Products.findByName(name)).length || !Products.findByName(name):
      err.message = 'Product already exists';
      break;
    default:
      return true;
  }
  return err;
};

const listProducts = async () => ({ products: await Products.getAll() });

const addProduct = async (name, quantity) => {
  const err = validadeProduct(name, quantity);
  if (err.message) return { err, error: true };
  const product = await Products.add(name, quantity);
  return { _id: product.insertedId, name, quantity };
};

const findProduct = async (id) => {
  const product = await Products.findById(id);
  if (!product) {
    return { err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
    error: true };
  }
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const err = validadeProduct(name, quantity);
  if (err.message) return { err, error: true };
  const product = await Products.update(id, name, quantity);
  return { _id: product.insertedId, name, quantity };
};

const deleteProduct = async (id) => {
  const found = await Products.findById(id);
  if (!found) {
    return { err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
    error: true };
  }
  await Products.exclude(id);
  return found;
};

module.exports = { listProducts, addProduct, findProduct, updateProduct, deleteProduct };
