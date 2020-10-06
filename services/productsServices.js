const {
  createProducts,
  updateProductById,
  deleteProductById,
  getAllProducts,
  getProductById,
  } = require('../models/productsModel');
const { productRegistryValidation, productUpdateValidation } = require('./validation');
  
const createProduct = async ({ name, quantity }) => {
  try {
    const bodyValidation = await productRegistryValidation(name, quantity);
    const newProduct = !bodyValidation && (await createProducts(name, quantity));
  
    return bodyValidation || { ...newProduct };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProduct = async (id, name, quantity) => {
  try {
    const bodyValidation = await productUpdateValidation(name, quantity);
    const updatedProduct = !bodyValidation && (await updateProductById(id, name, quantity));
    return bodyValidation || { ...updatedProduct };
  } catch (error) {
    throw new Error(error.message);
  }
};
  
const readOrDeleteById = async (id, operation = 'read') => {
  try {
    const func = (callback) => callback(id);
    const data = async () => {
  if (operation === 'delete') return func(deleteProductById);
  return func(getProductById);
    };
    const dataReturn = await data();
    return dataReturn;
  } catch (error) {
    throw new Error(error.message);
  }
  };
  
const listProducts = async () => {
  try {
    const products = await getAllProducts();
    return [...products];
  } catch (error) {
    throw new Error(error.message);
  }
};
  
module.exports = {
  createProduct,
  updateProduct,
  readOrDeleteById,
  listProducts,
};
