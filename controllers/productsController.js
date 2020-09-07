// const boom = require('@hapi/boom');
const { Router } = require('express');
const rescue = require('express-rescue');
const productsService = require('../services/productsService');

const products = Router();

products.post(
  '/',
  rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const createdProduct = await productsService.createProduct(name, quantity);
    if (createdProduct.err) {
      return res.status(422).json(createdProduct);
    }
    return res.status(201).json(createdProduct);
  }),
);

products.get(
  '/',
  rescue(async (_req, res) => {
    const returnedProducts = await productsService.getAllProducts();
    return res.status(200).json(returnedProducts);
  }),
);

products.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const returnedProduct = await productsService.getProductById(id);
    if (returnedProduct && returnedProduct.err) {
      return res.status(422).json(returnedProduct);
    }
    return res.status(200).json(returnedProduct);
  }),
);

products.put(
  '/:id',
  rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const updatedProduct = await productsService.updateProduct(id, name, quantity);
    if (updatedProduct.err) {
      return res.status(422).json(updatedProduct);
    }
    return res.status(200).json(updatedProduct);
  }),
);

products.delete(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await productsService.deleteProduct(id);
    if (deletedProduct && deletedProduct.err) {
      return res.status(422).json(deletedProduct);
    }
    return res.status(200).end();
  }),
);

module.exports = products;
