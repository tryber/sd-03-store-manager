const salesModel = require('../models/salesModel');
// const { WRONG_ID, errMessage } = require('./errorsServices');

const createSales = async (sales) => salesModel.registerSales(sales);

const getAllSales = async () => salesModel.getAllSales();

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  // if (!sale) return { error: true, message: errMessage('invalid_data', WRONG_ID) };
  return sale;
};

const updateSale = async (id, newSaleData) =>
  // const sale = getSaleById(id);
  salesModel.updateSale(id, newSaleData);
module.exports = {
  createSales,
  getAllSales,
  getSaleById,
  updateSale,
};
