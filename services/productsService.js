const { productsModel } = require('../models');
const { productValidation } = require('../utils');

const getAllProducts = async () => productsModel.getAllProducts();

const createProduct = async (name, quantity) => {
  const isValid = await productValidation(name, quantity);

  if (isValid.err) return isValid;

  return productsModel.createProduct(name, quantity);
};

module.exports = {
  getAllProducts,
  createProduct,
};
