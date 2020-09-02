const { salesModel } = require('../models');
const { validate } = require('@expresso/validator');
const generic = require('./generic');

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

async function verifyExistenceById(id, shouldExists) {
  const sale = await salesModel.getById(id);
  console.log('service existence', sale);
  return generic.handleExistence(sale, shouldExists);
}

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

async function deleteSaleById(id) {
  return salesModel.deleteSaleById(id);
}

module.exports = {
  validateSale: validate(salesSchema),
  validateProduct: validate(saleProductSchema),
  verifyExistenceById,
  addSale,
  getAll,
  getById,
  updateItenById,
  deleteSaleById,
};
