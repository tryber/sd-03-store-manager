const { Router } = require('express');
const rescue = require('express-rescue');
const productService = require('../services/productService');

const products = Router();

products.post('/', rescue(async (req, res, _next) => {
  const { name, quantity } = req.body;
  const postProduct = await productService.createProduct(name, quantity);
  if (postProduct.error) {
    return res.status(422).json({ err: { code: 'invalid_data', message: postProduct.message } });
  }
  return res.status(201).json(postProduct);
}));

products.get('/', async (_, res) => {
  const product = await productService.getAllProducts();
  res.status(200).json(product);
});

products.get('/:id', async (req, res) => {
  const { id } = req.params;
  const getProduct = await productService.getProductById(id);
  if (getProduct.error) {
    return res.status(422).json({ err: { code: 'invalid_data', message: getProduct.message } });
  }
  return res.status(200).json(getProduct);
});

products.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const newProduct = await productService.updateProduct(id, { name, quantity });
  if (newProduct.error) {
    return res.status(422).json({ err: { code: 'invalid_data', message: newProduct.message } });
  }
  return res.status(200).json(newProduct);
}));

module.exports = products;
