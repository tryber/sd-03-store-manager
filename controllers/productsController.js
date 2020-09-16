const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const products = await productsService.getAllProducts();

  res.status(200).json(products);
};

module.exports = {
  getAll,
};
