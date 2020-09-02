const { salesModel } = require('../models');
const { validate } = require('@expresso/validator');

const saleProductSchema = {
  type: 'object',
  properties: {
    productId: { type: 'string', maxLength: 24, minLength: 23 },
    quantity: { type: 'integer', minimum: 0 },
  },
  additionalProperties: false,
  required: ['productId', 'quantity'],
};

const salesSchema = {
  type: 'object',
  properties: {
    products: {
      type: 'array',
      itens: saleProductSchema,
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

async function updateItenById(id, productId, quantity) {
  return salesModel.updateById(id, productId, { quantity });
}

module.exports = {
  validateSale: validate(salesSchema),
  validateProduct: validate(saleProductSchema),
  addSale,
  getAll,
  getById,
  updateItenById,
};
