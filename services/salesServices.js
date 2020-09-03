const salesModel = require('../models/salesModel');
const { SALE_NOT_FOUND, WRONG_SALE_ID, errMessage } = require('./errorsServices');

const createSales = async (sales) => salesModel.registerSales(sales);

const getAllSales = async () => salesModel.getAllSales();

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  if (!sale) return { error: true, message: errMessage('not_found', SALE_NOT_FOUND) };
  return sale;
};

const updateSale = async (id, newSaleData) =>
  salesModel.updateSale(id, newSaleData);

const deleteSaleById = async (id) => {
  const reqSale = await getSaleById(id);
  if (!reqSale) return { error: true, message: errMessage('invalid_data', WRONG_SALE_ID) };
  await salesModel.deleteSale(id);
  return reqSale;
};
module.exports = {
  createSales,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSaleById,
};
