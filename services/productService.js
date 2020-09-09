const model = require('../model/model');

const sameProduct = async (name) => {
  const result = await model.getProductByName(name);
  return result;
};

const createProduct = async (name, quantity) => {
  const result = await model.createProductInDB(name, quantity);
  return result;
};

const showAllProducts = async () => {
  const result = await model.getAllProducts();
  return result;
};

const getProductById = async (id) => {
  const result = await model.getProductById(id);
  return result;
};

const updateProductById = async (id, name, quantity) => {
  const result = await model.updateProductById(id, name, quantity);
  return result;
};

const deleteProductById = async (id, name, quantity) => {
  const result = await model.deleteProductById(id, name, quantity);
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
