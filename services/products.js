const { productModel } = require('../models');
const generic = require('./generic');

async function verifyAllExistencesById(ids) {
  const products = await productModel.getAllById(ids);
  if (products.length === ids.length) return { error: true, message: 'Not all products exists' };
  return products;
}

/**
 * @param {string} name já validado nome do produto a ser procurado
 * @param {string} shouldExists 'should not exists' ou 'should exists' pode gerar erro
 */
async function verifyExistenceByName(name, shouldExists) {
  const product = await productModel.getByName(name);
  return generic.handleExistence(product, shouldExists);
}

async function verifyExistenceById(id, shouldExists) {
  const product = await productModel.getById(id);
  return generic.handleExistence(product, shouldExists);
}

async function createProduct(name, quantity) {
  const { insertedId } = await productModel.add(name, quantity);
  return { _id: insertedId, name, quantity };
}

async function getAll() {
  return productModel.getAll();
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
  verifyExistenceByName,
  verifyExistenceById,
  createProduct,
  getAll,
  getAllById,
  getByName,
  getById,
  updateById,
  deleteById,
};
