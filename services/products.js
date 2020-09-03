const { productModel } = require('../models');
const Joi = require('joi');
const generic = require('./generic');

const productSchema = Joi.object({
  name: Joi.string().min(5).required()
    .error(() => new Error('"name" length must be at least 5 characters long')),
  quantity: Joi.number().integer().min(1).required()
    .error(([{ local }]) => new Error(
      (typeof local.value !== 'number')
      ? '"quantity" must be a number'
      : '"quantity" must be larger than or equal to 1'
    )),
});

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
  productSchema,
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
