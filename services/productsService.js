const productModel = require('../models/productsModel');
const { ObjectId } = require('mongodb');

const regexId = /^[0-9a-fA-F]{24}$/;

const validateProduct = async (name, quantity) => {
  let response = true;
  if (quantity < 1) {
    response = {
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    };
  }
  if (typeof quantity === 'string') {
    response = { err: { code: 'invalid_data', message: '"quantity" must be a number' } };
  }
  if (name.length < 5) {
    response = {
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    };
  }
  const checkNameProduct = await productModel.findByNameProduct(name);
  if (checkNameProduct) {
    response = { err: { code: 'invalid_data', message: 'Product already exists' } };
  }
  return response;
};

const getAllStore = async () => {
  const listProduct = { products: await productModel.getAllStore() };

  return listProduct;
};

const findProductById = async (id) => {
  if (!regexId.test(id)) return { err: { message: 'Wrong id format', code: 'invalid_data' } };
  const product = await productModel.findProductById(id);
  return product;
};

const createProduct = async ({ name, quantity }) => {
  const validation = await validateProduct(name, quantity);

  if (validation.err) return validation;
  return productModel.createProduct(name, quantity);
};

const updateProduct = async (id, { name, quantity }) => {
  const updating = await validateProduct(name, quantity);

  if (updating.err) return updating;
  return productModel.updateProduct(id, name, quantity);
};

const deleteProduct = async (id) => {
  const verifyProduct = await findProductById(id);

  if (!regexId.test(id)) return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  await productModel.deleteProduct(ObjectId(id));
  return verifyProduct;
};

module.exports = { getAllStore, createProduct, findProductById, updateProduct, deleteProduct };
