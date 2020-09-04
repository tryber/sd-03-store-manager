const { productModel } = require('../models');

async function verifyAllExistencesById(ids) {
  const products = await productModel.getAllById(ids);
  if (products.length !== ids.length) return { error: true, message: 'Not all products exists' };
  return products;
}

async function createProduct(name, quantity) {
  const { insertedId } = await productModel.add(name, quantity);
  return { _id: insertedId, name, quantity };
}

async function getAll() {
  const products = await productModel.getAll();
  return { products };
}

async function getAllById(ids) {
  return productModel.getAllById(ids);
}

async function getByName(name) {
  return productModel.getByName(name);
}

async function getById(id) {
  return productModel.getById(id);
}

async function updateById(id, { name, quantity }) {
  productModel.updateById(id, { name, quantity });
  return { _id: id, name, quantity };
}

async function deleteById(id) {
  const product = await getById(id);
  await productModel.deleteById(id);
  return product;
}

module.exports = {
  verifyAllExistencesById,
  createProduct,
  getAll,
  getAllById,
  getByName,
  getById,
  updateById,
  deleteById,
};
