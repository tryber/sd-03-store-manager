const productModel = require('../models/productsModel');
const { ObjectId } = require('mongodb');

const regexId = /^[0-9a-fA-F]{24}$/;

// const quantityValue = (quan) => {
//   if (quan <= 0) {
//     return {
//       err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
//     };
//   }
//   return null;
// };
// const quantityIsNumber = (quant) => {
//   if (typeof quant === 'string') {
//     return { err: { code: 'invalid_data', message: '"quantity" must be a number' } };
//   }
//   return null;
// };
// const nameIsValid = (nam) => {
//   if (nam.length < 5) {
//     return {
//       err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
//     };
//   }
//   return true;
// };

const validateProduct = async (name, quantity) => {
  const checkNameProduct = await productModel.findByNameProduct(name);
  if (quantity < 1) {
    return {
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    };
  }
  else if (typeof quantity === 'string') {
    return { err: { code: 'invalid_data', message: '"quantity" must be a number' } };
  }
  else if (name.length < 5) {
    return {
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    };
  }
  else if (checkNameProduct) {
    return { err: { code: 'invalid_data', message: 'Product already exists' } };
  }
  return true;
};

const getAllStore = async () => {
  const listProduct = { products: await productModel.getAllStore() };

  return listProduct;
};

const findProductById = async (id) => {
  if (!regexId.test(id)) return { err: { message: 'Wrong id format', code: 'invalid_data' } };
  const product = await productModel.findProductById(id);
  return product;
};

const createProduct = async ({ name, quantity }) => {
  const validation = await validateProduct(name, quantity);

  if (validation.err) return validation;
  return productModel.createProduct(name, quantity);
};

const updateProduct = async (id, { name, quantity }) => {
  const updating = await validateProduct(name, quantity);

  if (updating.err) return updating;
  return productModel.updateProduct(id, name, quantity);
};

const deleteProduct = async (id) => {
  const verifyProduct = await findProductById(id);

  if (!regexId.test(id)) return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  await productModel.deleteProduct(ObjectId(id));
  return verifyProduct;
};

module.exports = { getAllStore, createProduct, findProductById, updateProduct, deleteProduct };
