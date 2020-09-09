const model = require('../model/model');

const createSale = async (products) => {
  const result = await model.createSaletInDB(products);
  return result;
};

const showAllSales = async () => {
  const result = await model.getAllSales();
  return result;
};

const getSaleById = async (id) => {
  const result = await model.getSaleById(id);
  return result;
};

const updateSaleById = async (id, productId, quantity) => {
  const result = await model.updateSaleById(id, productId, quantity);
  return result;
};

const deleteSaleById = async (id) => {
  const result = await model.deleteSaleById(id);
  return result;
};

module.exports = {
  createSale,
  showAllSales,
  getSaleById,
  updateSaleById,
  deleteSaleById,
};
