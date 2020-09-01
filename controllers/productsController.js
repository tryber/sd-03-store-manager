// const boom = require('@hapi/boom');
const rescue = require('express-rescue');
const productsService = require('../services/productsService');

const createProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const createdProduct = await productsService.createProduct(name, quantity);
  if (createdProduct.err) {
    return res.status(422).json(createdProduct);
  }
  return res.status(201).json(createdProduct);
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
  const updatedProduct = await productsService.updateProduct(id, name, quantity);
  if (updatedProduct.err) {
    return res.status(422).json(updatedProduct);
  }
  return res.status(201).json(updatedProduct);
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};
