const { salesModel } = require('../models');
const { saleValidation } = require('../utils');

const getAllSales = async () => salesModel.getAllSales();

const createSale = async (sales) => {
  const sale = await saleValidation(sales);

  if (sale.err) return sale;

  return salesModel.createSale(sales);
};

module.exports = {
  getAllSales,
  createSale,
};
