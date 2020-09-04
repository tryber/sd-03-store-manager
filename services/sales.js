const { salesModel } = require('../models');

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

async function updateItenById(id, itensSold) {
  const updates = itensSold.map(({ productId, quantity }) =>
    async () => await salesModel.updateById(id, productId, { quantity }),
  );
  await Promise.all(updates);
  return { _id: id, itensSold };
}

async function deleteSaleById(id) {
  return salesModel.deleteSaleById(id);
}

module.exports = {
  addSale,
  getAll,
  getById,
  updateItenById,
  deleteSaleById,
};
