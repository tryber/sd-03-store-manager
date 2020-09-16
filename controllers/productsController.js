const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const products = await productsService.getAllProducts();

  res.status(200).json(products);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsService.createProduct(name, quantity);

  if (product.err) return res.status(422).json(product);

  return res.status(201).json(product);
};

module.exports = {
  getAll,
  createProduct,
};
