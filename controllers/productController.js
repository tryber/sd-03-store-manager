const { Router } = require('express');
const productService = require('../services/productService');

const products = Router();

products.post('/', async (req, res, _next) => {
  const { name, quantity } = req.body;
  const product = await productService.createProduct(name, quantity);
  if (product.err) {
    return res.status(422).json({ message: product.message });
  }
  return res.status(201).json(product);
});

products.get('/', async (_, res) => {
  const product = await productService.getAllProducts();
  res.status(200).json(product);
});

products.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  if (product.err) {
    return res.status(422).json({ message: product.message });
  }
  return res.status(200).json(product);
});

module.exports = products;
