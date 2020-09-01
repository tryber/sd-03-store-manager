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
      'minimum': 0,
    },
  },
  additionalProperties: false,
  required: ['name', 'quantity'],
};

const validateProduct = validate(productsSchema);

async function createProduct(name, quantity) {
  const { insertedId } = productModel.add(name, quantity);
  return { _id: insertedId, name, quantity };
}

async function getByName(name) {
  return productModel.getByName(name);
}

module.exports = {
  createProduct,
  validateProduct,
  getByName,
};
