const productModel = require('../models/productModel');

// const validateProductData = async (name, quantity) => {
//   const nameExists = await productModel.getProductByName(name);
//   if (typeof name !== 'string' || name.length < 5) {
//     return { error: true, message: '"name" length must be at least 5 characters long' };
//   }
//   if (quantity < 1) {
//     return { error: true, message: '"quantity" must be larger than or equal to 1' };
//   }
//   if (!Number.isInteger(quantity)) {
//     return { error: true, message: '"quantity" must be a number' };
//   }
//   if (nameExists) {
//     return { error: true, message: 'Product already exists' };
//   }
//   return { error: false };
// };

const validateProductData = async (name, quantity) => {
  const nameExists = await productModel.getProductByName(name);
  switch (true) {
    case (typeof name !== 'string' || name.length < 5):
      return { error: true, message: '"name" length must be at least 5 characters long' };
    case (quantity < 1):
      return { error: true, message: '"quantity" must be larger than or equal to 1' };
    case (!Number.isInteger(quantity)):
      return { error: true, message: '"quantity" must be a number' };
    case (!!nameExists):
      return { error: true, message: 'Product already exists' };
    default:
      return { error: false };
  }
};

const createProduct = async (name, quantity) => {
  const validation = await validateProductData(name, quantity);
  if (validation.error) return validation;
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
  const product = await getProductById(id);
  if (product.error) return product;
  const validation = await validateProductData(name, quantity);
  if (validation.error) return validation;
  return productModel.updateProduct(id, { name, quantity });
};

const deleteProduct = async (id) => {
  await productModel.deleteProduct(id);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
