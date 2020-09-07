const {
  getProductByName,
  insertProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductsById,
  updateProductStock,
} = require('../models/productsModel');

const productNameIsValid = (name) => {
  if (typeof name !== 'string' || name.length <= 5) return '"name" length must be at least 5 characters long';
};

const productAlredyExists = async (name) => {
  const productCheck = await getProductByName(name);
  if (productCheck) return 'Product already exists';
  return false;
};

const productQuantityIsValid = (quantity) => {
  const validation = quantity <= 0;
  if (validation) return '"quantity" must be larger than or equal to 1';
  if (typeof quantity !== 'number') return '"quantity" must be a number';
  return false;
};

const validateId = (id) => {
  const hexadecimalRegex = /^(0x|0X)?[a-fA-F0-9]+$/;
  if (id.length < 16 || !hexadecimalRegex.test(id)) return 'Wrong id format';
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

const updateProductQuantity = async (id, soldQuantity, operator) => {
  const product = await updateProductStock(id, soldQuantity, operator);
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
  validateId,
  updateProductQuantity,
};
