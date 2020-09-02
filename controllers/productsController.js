const boom = require('@hapi/boom');
const { Router } = require('express');
const rescue = require('express-rescue');

const productsService = require('../services/productsService');

const products = Router();

products.get('/', rescue(async (_, res) => {
  const product = await productsService.getAllProducts();

  res.status(200).json(product);
}));

products.post('/', rescue(async (req, res, next) => {
  const { name, quantity } = req.body;

  const product = await productsService.createProduct(name, quantity);

  if (product.error) {
    if (!name || name.length < 5) return { 
      error: true, code: 'invalid_data', message: '"name" length must be at least 5 characters long' 
    };
    if (quantity <= 0) return { 
      error: true, code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' 
    };
    return { error: false };
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

products.put('/:id', rescue(async (req, res, next) => {
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
