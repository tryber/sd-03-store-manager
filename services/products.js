const { productModel } = require('../models');
const { validate } = require('@expresso/validator');
const Boom = require('@hapi/boom');

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

/**
 * Confere se existe o produto pelo nome, caso exista adiciona na propriedade produto de res
 */
async function verifyExistenceByName(name, shouldExists) {
  const product = await productModel.getByName(name);
  if (!product && shouldExists === 'should exists') {
    return { error: true, message: 'Product doesn\'t exists' };
  }
  if (product && shouldExists === 'should not exists') {
    return { error: true, message: 'Product already exists' };
  }
  return product;
}

async function verifyExistenceById(id, shouldExists) {
  const product = await productModel.getById(id);
  if (!product && shouldExists === 'should exists') {
    return { error: true, message: 'Product doesn\'t exists' };
  }
  if (product && shouldExists === 'should not exists') {
    return { error: true, message: 'Product already exists' };
  }
  return product;
}

async function createProduct(name, quantity) {
  const { insertedId } = await productModel.add(name, quantity);
  return { _id: insertedId, name, quantity };
}

async function getAll() {
  return productModel.getAll();
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
  verifyExistenceByName,
  verifyExistenceById,
  createProduct,
  validateProduct,
  getAll,
  getByName,
  getById,
  updateById,
  deleteById,
};
