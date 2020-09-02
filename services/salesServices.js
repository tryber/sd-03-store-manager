const { createSales } = require('../models/salesModel');
const { productRegistryValidation } = require('./validation');

const createSale = async (products = []) => {
  try {
    const productsValidation = products.map(({ name, quantity }) =>
      productRegistryValidation(name, quantity));
    const newSale = !productsValidation.length && createSales(products);

    return productsValidation || { ...newSale };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createSale };
