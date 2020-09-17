// CONTROLLER: trata as requisições e envia somente o necessário para o service!
const express = require('express');
// const path = require('path');
const productService = require('../services/productsS');
const productModel = require('../models/productsM');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    return err;
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productModel.getProductsById(id);
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    next({ status: 422, err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const duplicate = await productModel.getProductsByName(name);
    const data = productService.validadeProduct(name, quantity, duplicate);
    if (data.status !== 200) return next(data);
    const createdProduct = await productModel.createProduct(name, quantity);
    return res.status(201).json(createdProduct);
  } catch (err) {
    console.error(err);
    return err;
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { params: { id }, body: { name, quantity } } = req;
    const data = productService.validadeProduct(name, quantity);
    if (data.status !== 200) return next(data);
    const product = await productModel.updateProduct(id, name, quantity);
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    return err;
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const product = await productModel.deleteProduct(id);
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    next({ status: 422, err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
});

module.exports = router;
