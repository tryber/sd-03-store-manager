const {
  getProductByName,
  insertProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductsById,
} = require('../models/productsModel');

const productNameIsValid = (name) => {
  if (typeof name !== 'string' || name.length <= 5) return 'name length must be at least 5 characters long';
};

const productAlredyExists = async (name) => {
  const productCheck = await getProductByName(name);
  if (productCheck) return 'Product alredy exists';
  return false;
};

const productQuantityIsValid = (quantity) => {
  const validation = quantity <= 0;
  if (typeof quantity !== 'number' || validation) return 'quantity must be larger than or equal to 1';
  return false;
};

const addProduct = async (name, quantity) => {
  const response = await insertProduct(name, quantity);
  return response;
};

const listAllProducts = async () => {
  const products = await getAllProducts();
  return products;
};

const listProductsById = async (id) => {
  const product = await getProductById(id);
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const product = await updateProductById(id, name, quantity);
  return product;
};

const deleteProduct = async (id) => {
  const product = await deleteProductsById(id);
  return product;
};

module.exports = {
  productNameIsValid,
  productQuantityIsValid,
  productAlredyExists,
  addProduct,
  listAllProducts,
  listProductsById,
  updateProduct,
  deleteProduct,
};
