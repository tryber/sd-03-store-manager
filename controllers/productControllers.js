const express = require('express');
const rescue = require('express-rescue');
const productService = require('../services/productsService');

const app = express();

const findAllProducts = app.get(
  '/products',
  rescue(async (_req, res) => {
    const listProducts = await productService.getAllStore();
    res.status(200).json(listProducts);
  }),
);

const findProductById = app.get(
  '/products/:id',
  rescue(async (req, res) => {
    const product = await productService.findProductById(req.params.id);

    if (product.err) return res.status(422).json(product);
    return res.status(200).json(product);
  }),
);

const createProduct = app.post(
  '/products',
  rescue(async (req, res) => {
    const registerProduct = await productService.createProduct(req.body);

    if (registerProduct.err) {
      return res.status(422).json(registerProduct);
    }
    return res.status(201).json(registerProduct);
  }),
);

const updateProduct = app.put(
  '/products/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const updatingProduct = await productService.updateProduct(id, req.body);

    if (updatingProduct.err) {
      return res.status(422).json(updatingProduct);
    }
    return res.status(200).json(updatingProduct);
  }),
);

const deleteProduct = app.delete(
  '/products/:id',
  rescue(async (req, res) => {
    const product = await productService.deleteProduct(req.params.id);

    if (product.err) return res.status(422).json(product);
    return res.status(200).json(product);
  }),
);

module.exports = { findAllProducts, createProduct, findProductById, updateProduct, deleteProduct };
