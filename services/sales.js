const { salesModel } = require('../models');
const { validate } = require('@expresso/validator');

const salesSchema = {
  type: 'object',
  properties: {
    products: {
      type: 'array',
      itens: {
        type: 'object',
        properties: {
          productId: { type: 'string', maxLength: 24, minLength: 23 },
          quantity: { type: 'integer', minimum: 0 },
        },
        additionalProperties: false,
        required: ['productId', 'quantity'],
      },
    },
  },
  additionalProperties: false,
  required: ['products'],
};

async function addSale(products) {
  const { insertedId } = await salesModel.createSale(products);
  return { _id: insertedId, products };
}

async function getAll() {
  return salesModel.getAll();
}

async function getById(id) {
  return salesModel.getById(id);
}

module.exports = {
  validateSale: validate(salesSchema),
  addSale,
  getAll,
  getById,
};
