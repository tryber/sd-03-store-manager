const { registerProducts } = require('../models/productsModel');

const createProduct = async ({ name, quantity }) => {
  try {
    const product = await registerProducts(name, quantity);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createProduct,
};
