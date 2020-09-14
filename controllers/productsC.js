// CONTROLLER: trata as requisições e envia somente o necessário para o service!
const express = require('express');
// const path = require('path');
const productService = require('../services/productsS');
const productModel = require('../models/productsM');

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('pong');
});

router.post('/', async (req, res, next) => {
  const { name, quantity } = req.body;
  const duplicate = await productModel.getProductsByName(name);
  const data = productService.validadeProduct(name, quantity, duplicate);
  if (data.status !== 201) return next(data);
  const createdProduct = await productModel.createProduct(name, quantity);
  return res.status(201).json(createdProduct);
});

module.exports = router;
