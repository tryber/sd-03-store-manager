const productModel = require('../model/productModel');

const sameProduct = async (name) => {
  const result = await productModel.getProductByName(name);
  return result;
};

const createProduct = async (name, quantity) => {
  const result = await productModel.createProductInDB(name, quantity);
  return result;
};

const showAllProducts = async () => {
  const result = await productModel.getAllProducts();
  return result;
};

const getProductById = async (id) => {
  const result = await productModel.getProductById(id);
  return result;
};

const updateProductById = async (id, name, quantity) => {
  const result = await productModel.updateProductById(id, name, quantity);
  return result;
};

const deleteProductById = async (id, name, quantity) => {
  const result = await productModel.deleteProductById(id, name, quantity);
  return result;
};

module.exports = {
  sameProduct,
  createProduct,
  showAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
