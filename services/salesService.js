const salesModel = require('../models/salesModel');
// const productModel = require('../models/productModel');

const createSale = async (itensSold) => {
  const sale = await salesModel.createSale(itensSold);
  return sale;
};

module.exports = {
  createSale,
};
