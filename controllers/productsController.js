const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const products = await productsService.getAllProducts();

  return res.status(200).json({ products });
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsService.createProduct(name, quantity);

  if (product.err) return res.status(422).json(product);

  return res.status(201).json(product);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProductById(id);

  if (product.err) return res.status(422).json(product);

  return res.status(200).json(...product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await productsService.updateProduct(id, name, quantity);

  if (product.err) return res.status(422).json(product);

  return res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await productsService.deleteProduct(id);

  if (product && product.err) return res.status(422).json(product);

  return res.status(200).end();
};

module.exports = {
  getAll,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
