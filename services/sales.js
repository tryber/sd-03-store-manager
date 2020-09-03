const { salesModel } = require('../models');
const generic = require('./generic');

async function verifyExistenceById(id, shouldExists) {
  const sale = await salesModel.getById(id);
  return generic.handleExistence(sale, shouldExists);
}

async function addSale(itensSold) {
  const { insertedId } = await salesModel.createSale(itensSold);
  return { _id: insertedId, itensSold };
}

async function getAll() {
  const sales = await salesModel.getAll();
  return { sales };
}

async function getById(id) {
  return salesModel.getById(id);
}

async function updateItenById(id, productId, quantity) {
  await salesModel.updateById(id, productId, { quantity });
  return { _id: id, itensSold: [{ productId, quantity }] };
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
