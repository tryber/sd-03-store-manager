const { productsModel } = require('../models');

const getAllProducts = async () => productsModel.getAllProducts();

module.exports = {
  getAllProducts,
};
