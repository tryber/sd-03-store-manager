const { productsModel } = require('../models');
const { validateId, validateProductData, getErrorObject } = require('./helpers');
const { invalidData, wrongFormat } = require('./errorLibrary');

const createProduct = async (name, quantity) => {
  const isDataValid = validateProductData(name, quantity);

  if (typeof isDataValid === 'object') return isDataValid;

  const existProduct = await productsModel.getProductByName(name);

  if (existProduct) return getErrorObject(invalidData, 'Product already exists');

  const createdProduct = await productsModel.createProduct(name, quantity);

  return createdProduct;
};

const getAllProducts = async () => productsModel.getAllProducts();

const getProductById = async (id) => {
  const isIdValid = validateId(id, wrongFormat);

  if (typeof isIdValid === 'object') return isIdValid;

  const product = productsModel.getProductById(id);

  if (!product) getErrorObject(invalidData, wrongFormat);

  return product;
};

const updateProduct = async (id, name, quantity) => {
  const isDataValid = validateProductData(name, quantity);

  if (typeof isDataValid === 'object') return isDataValid;

  const updatedProduct = await productsModel.updateProduct(id, name, quantity);

  return updatedProduct;
};

const deleteProduct = async (id) => {
  const isIdValid = validateId(id, wrongFormat);

  if (typeof isIdValid === 'object') return isIdValid;

  const product = productsModel.getProductById(id);

  if (!product) getErrorObject(invalidData, wrongFormat);

  await productsModel.deleteProduct(id);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
