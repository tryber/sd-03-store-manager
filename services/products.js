const { productModel } = require('../models');
const { validate } = require('@expresso/validator');

const productsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 5,
    },
    quantity: {
      type: 'integer',
      minimum: 1,
    },
  },
  additionalProperties: false,
  required: ['name', 'quantity'],
};

const validateProduct = validate(productsSchema);

function handleExistence(product, shouldExists) {
  if (!product && shouldExists === 'should exists') {
    return { error: true, message: 'Product doesn\'t exists' };
  }
  if (product && shouldExists === 'should not exists') {
    return { error: true, message: 'Product already exists' };
  }
  return product;
}

async function verifyAllExistencesById(ids) {
  const products = await getAllById(ids);
  if (products.length === ids.length) return { error: true, message: 'Not all products exists' };
  return products;
}

/**
 * @param {string} name já validado nome do produto a ser procurado
 * @param {string} shouldExists 'should not exists' ou 'should exists' pode gerar erro
 */
async function verifyExistenceByName(name, shouldExists) {
  const product = await productModel.getByName(name);
  return handleExistence(product, shouldExists);
}

async function verifyExistenceById(id, shouldExists) {
  const product = await productModel.getById(id);
  return handleExistence(product, shouldExists);
}

async function createProduct(name, quantity) {
  const { insertedId } = await productModel.add(name, quantity);
  return { _id: insertedId, name, quantity };
}

async function getAll() {
  return productModel.getAll();
}

async function getAllById(ids) {
  return productsModel.getAllById(ids);
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
  validateProduct,
  getAll,
  getAllById,
  getByName,
  getById,
  updateById,
  deleteById,
};
