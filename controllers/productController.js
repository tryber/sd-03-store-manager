const { Router } = require('express');
const productService = require('../services/productService');

const products = Router();

products.post('/', async (req, res, _next) => {
  const { name, quantity } = req.body;
  const postProduct = await productService.createProduct(name, quantity);
  if (postProduct.error) {
    return res.status(422).json({ code: 'invalid_data', message: postProduct.message });
  }
  return res.status(201).json(postProduct);
});

products.get('/', async (_, res) => {
  const product = await productService.getAllProducts();
  res.status(200).json(product);
});

products.get('/:id', async (req, res) => {
  const { id } = req.params;
  const getProduct = await productService.getProductById(id);
  if (getProduct.error) {
    return res.status(422).json({ code: 'invalid_data', message: getProduct.message });
  }
  return res.status(200).json(getProduct);
});

module.exports = products;
