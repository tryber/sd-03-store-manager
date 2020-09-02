const productsModel = require('../models/productsModel');
const { validateData, validateID } = require('./helpers');

const createProduct = async (name, quantity) => {
  const isValid = validateData(name, quantity);
  if (typeof isValid === 'object') return isValid;

  const existProduct = await productsModel.getProductByName(name);

  if (existProduct) {
    return {
      err: { code: 'invalid_data', message: 'Product already exists' },
    };
  }

  const createdProduct = await productsModel.createProduct(name, quantity);
  return createdProduct;
};

const getAllProducts = async () => productsModel.getAllProducts();

const getProductById = async (id) => {
  const isIdValid = validateID(id);

  if (typeof isIdValid === 'object') return isIdValid;

  const product = productsModel.getProductById(id);

  if (!product) {
    return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }

  return product;
};

const updateProduct = async (id, name, quantity) => {
  const isValid = validateData(name, quantity);
  if (typeof isValid === 'object') return isValid;

  const updatedProduct = await productsModel.updateProduct(id, name, quantity);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const isIdValid = validateID(id);

  if (typeof isIdValid === 'object') return isIdValid;

  const product = productsModel.getProductById(id);
  if (!product) {
    return {
      err: { code: 'invalid_data', message: 'Wrong id format' },
    };
  }
  await productsModel.deleteProduct(id);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
