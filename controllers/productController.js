const { Router } = require('express');
const productService = require('../services/productService');

const products = Router();

products.post('/', async (req, res, _next) => {
  const { name, quantity } = req.body;
  const product = await productService.createProduct(name, quantity);
  if (product.err) {
    return res.status(422).json({ code: 'invalid_data', message: product.message });
  }
  return res.status(201).json(product);
});

module.exports = products;
