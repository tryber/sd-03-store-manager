const { salesModel } = require('../models');
const generic = require('./generic');

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
  verifyExistenceById,
  addSale,
  getAll,
  getById,
  updateItenById,
  deleteSaleById,
};
