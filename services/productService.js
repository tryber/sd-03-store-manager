const productModel = require('../models/productModel');

// const validateProductData = async (name, quantity) => {
//   const nameExists = await productModel.getProductByName(name);
//   if (typeof name !== 'string' || name.length < 5) {
//     return { error: true, message: '"name" length must be at least 5 characters long' };
//   }
//   if (nameExists) {
//     return { error: true, message: 'Product already exists' };
//   }
//   if (quantity < 1) {
//     return { error: true, message: '"quantity" must be larger than ou equal to 1' };
//   }
//   if (!Number.isInteger(quantity)) {
//     return { error: true, message: '"quantity" must be a number' };
//   }
// };

// const createProduct = async (name, quantity) => {
//   const validation = validateProductData(name, quantity);
//   if (validation.error) return validation;
//   const product = await productModel.createProduct(name, quantity);
//   return product;
// };

const createProduct = async (name, quantity) => {
  const nameExists = await productModel.getProductByName(name);
  if (typeof name !== 'string' || name.length < 5) {
    return { error: true, message: '"name" length must be at least 5 characters long' };
  }
  if (nameExists) {
    return { error: true, message: 'Product already exists' };
  }
  if (quantity < 1) {
    return { error: true, message: '"quantity" must be larger than ou equal to 1' };
  }
  if (!Number.isInteger(quantity)) {
    return { error: true, message: '"quantity" must be a number' };
  }
  const product = await productModel.createProduct(name, quantity);
  return product;
};

const getAllProducts = async () => ({ products: await productModel.getAllProducts() });

const getProductById = async (id) => {
  const product = await productModel.getProductById(id);
  if (!product) return { error: true, message: 'Wrong id format' };
  return product;
};

const updateProduct = async (id, { name, quantity }) => {
  const nameExists = await productModel.getProductByName(name);
  if (typeof name !== 'string' || name.length < 5) {
    return { error: true, message: '"name" length must be at least 5 characters long' };
  }
  if (nameExists) {
    return { error: true, message: 'Product already exists' };
  }
  if (quantity < 1) {
    return { error: true, message: '"quantity" must be larger than ou equal to 1' };
  }
  if (!Number.isInteger(quantity)) {
    return { error: true, message: '"quantity" must be a number' };
  }
  const product = await getProductById(id);
  if (product.error) return product;
  return productModel.updateProduct(id, { name, quantity });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};
