const salesModel = require('../models/salesModel');
// const productModel = require('../models/productModel');

const createSale = async (productId, quantity) => {
  const sale = await salesModel.createSale(productId, quantity);
  return sale;
};

module.exports = {
  createSale,
};
