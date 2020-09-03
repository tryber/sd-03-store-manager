const express = require('express');
const rescue = require('express-rescue');
const productService = require('../services/productsService');

const app = express();

const allProducts = app.get(
  '/products',
  rescue(async (_req, res) => {
    const product = await productService.getAllStore('product');

    res.status(200).json(product);
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

module.exports = { allProducts, createProduct };
