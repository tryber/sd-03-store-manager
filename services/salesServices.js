const salesModel = require('../models/salesModel');

const createSales = async (sales) => salesModel.registerSales(sales);

module.exports = {
  createSales,
};
