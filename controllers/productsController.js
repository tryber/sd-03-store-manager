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
  const result = {};
  result.products = await productsService.getAllProducts();

  return res.status(200).json(result);
});

const getProductById = rescue(async (req, res) => {
  const { id } = req.params;

  const products = await productsService.getProductById(id);

  if (products.err) {
    return res.status(422).json(products);
  }

  return res.status(200).json(products);
});

const updateProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const products = await productsService.updateProduct(id, name, quantity);

  if (products.err) {
    return res.status(422).json(products);
  }
  const result = { products };
  return res.status(200).json(result);
});

const deleteProduct = rescue(async (req, res) => {
  const { id } = req.params;

  const products = await productsService.deleteProduct(id);

  if (products.err) {
    return res.status(422).json(products);
  }
  const result = { products };
  return res.status(200).json(result);
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
