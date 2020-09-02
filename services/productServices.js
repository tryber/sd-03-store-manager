const storeModel = require('../model/storeModel');

const checkName = async (name) => {
  if (name.length < 5) return { err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' } };
  if (await storeModel.findByName(name)) return { err: { code: 'invalid_data', message: 'Product already exists' } };
  return false;
};

const checkQuantity = async (quantity) => {
  if (quantity < 1) return { err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } };
  if (typeof (quantity) !== 'number') return { err: { code: 'invalid_data', message: '"quantity" must be a number' } };
  return false;
};

const validate = async (name, quantity) => {
  if ((await checkName(name)).err) return checkName(name);
  if ((await checkQuantity(quantity)).err) return checkQuantity(quantity);
  return true;
};

const validateUpdate = async (name, quantity) => {
  if (name.length < 5) return { err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' } };
  if (quantity < 1) return { err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } };
  if (typeof (quantity) !== 'number') return { err: { code: 'invalid_data', message: '"quantity" must be a number' } };
  return true;
};

const serviceGetAllProducts = () => storeModel.getAllProducts();

const serviceCreateProduct = async ({ name, quantity }) => {
  const product = await validate(name, quantity);
  if (product.err) return product;
  return storeModel.createProduct(name, quantity);
};

const getById = async (callback, id, code, message) => {
  const result = await callback(id);
  if (!result) return { err: { code, message } };
  return result;
};

const serviceGetProductById = async (id) => getById(storeModel.getProductById, id, 'invalid_data', 'Wrong id format');

const serviceUpdateProduct = async (id, { name, quantity }) => {
  const product = await validateUpdate(name, quantity);
  if (product.err) return product;
  return storeModel.updateProduct(id, { name, quantity });
};

const serviceDeleteProduct = async (id) => {
  const product = await storeModel.getProductById(id);
  if (!product) return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  await storeModel.deleteProduct(id);
  return product;
};

module.exports = {
  serviceCreateProduct,
  serviceGetAllProducts,
  serviceGetProductById,
  serviceUpdateProduct,
  serviceDeleteProduct,
  getById,
};
