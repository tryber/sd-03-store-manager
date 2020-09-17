const { salesModel } = require('../models');

const getAllSales = async () => salesModel.getAllSales();

module.exports = {
  getAllSales,
};
