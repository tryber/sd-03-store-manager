const rescue = require('express-rescue');
const productsService = require('../services/productsService');

const createProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const product = await productsService.createProduct(name, quantity);

  if (product.err) {
    return res.status(422).json(product);
  }

  return res.status(201).json(product);
});

const getAllProducts = rescue(async (_req, res) => {
  const products = await productsService.getAllProducts();

  return res.status(200).json(products);
});

const getProductById = rescue(async (req, res) => {
  const { id } = req.params;

  const product = await productsService.getProductById(id);

  if (product.err) {
    return res.status(422).json(product);
  }

  return res.status(200).json(product);
});

const updateProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const product = await productsService.updateProduct(id, name, quantity);

  if (product.err) {
    return res.status(422).json(product);
  }

  return res.status(200).json(product);
});

const deleteProduct = rescue(async (req, res) => {
  const { id } = req.params;

  const product = await productsService.deleteProduct(id);

  if (product.err) {
    return res.status(422).json(product);
  }

  return res.status(200).json(product);
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
