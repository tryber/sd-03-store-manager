const { productModel } = require('../models');
const { validate } = require('@expresso/validator');
const products = require('../models/products');

const productsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 5,
    },
    quantity: {
      type: 'integer',
      'minimum': 1,
    },
  },
  additionalProperties: false,
  required: ['name', 'quantity'],
};

const validateProduct = validate(productsSchema);

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
  return productModel.updateById(id,{ name, quantity });
}


module.exports = {
  createProduct,
  validateProduct,
  getAll,
  getByName,
  getById,
  updateById,
};
