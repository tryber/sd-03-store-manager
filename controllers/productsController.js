const productModel = require('../model/productModel');

const sameProduct = async (name) => {
  const result = await productModel.getProductByName(name);
  return result;
};

const createProduct = async (name, quantity) => {
  const result = await productModel.createProductInDB(name, quantity);
  return result;
};

module.exports = {
  sameProduct,
  createProduct,
};
