const boom = require('@hapi/boom');
const { Router } = require('express');
const rescue = require('express-rescue');

const productsService = require('../services/productsService');

const products = Router();

products.get('/', rescue(async (_, res) => {
  const products = await productsService.getAllProducts();

  res.status(200).json(products);
}));

products.post('/', rescue(async (req, res, next) => {
  const { name, quantity } = req.body;

  const product = await productsService.createProduct(name, quantity);

  if (product.error) {
    return next(boom.badData(product.message));
  }

  return res.status(201).json(product);
}));

products.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;

  const product = await productsService.getProductById(id);

  if (product.error) {
    return next(boom.notFound(product.message));
  }

  return res.status(200).json(product);
}));

products.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  await productsService.deleteProduct(id);

  return res.status(204).end();
}));

products.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const newProduct = await productsService.updateProduct(id, { name, quantity });

  if (newProduct.error) {
    const error = newProduct.code === 'not_found'
      ? boom.notFound(newProduct.message)
      : boom.badData(newProduct.message);

    return next(error);
  }

  return res.status(200).json(newProduct);
}));

module.exports = products;
