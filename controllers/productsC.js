// CONTROLLER: trata as requisições e envia somente o necessário para o service!
const express = require('express');
// const path = require('path');
const { CreateProduct, ReturnProducts, validadeProduct, UpdateProduct, DeleteProduct } = require('../services/productsS');
const productModel = require('../models/productsM');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { error, message, createdProduct } = await CreateProduct(name, quantity);
    if (error) {
      return next({ status: 422,
        err: { code: 'invalid_data', message },
      });
    }
    return res.status(201).json(createdProduct);
  } catch (err) {
    return err;
  }
});

router.get('/', async (_req, res) => {
  try {
    const products = await ReturnProducts();
    res.status(200).json({ products });
  } catch (err) {
    return err;
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await ReturnProducts(id);
    return res.status(200).json(product);
  } catch (err) {
    next({ status: 422, err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { params: { id }, body: { name, quantity } } = req;
    const { error, message, updatedProduct } = await UpdateProduct(id, name, quantity);
    if (error) {
      return next({
        status: 422, err: { code: 'invalid_data', message },
      });
    }
    return res.status(200).json(updatedProduct);
  } catch (err) {
    return err;
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const { error, message, product } = await DeleteProduct(id);
    if (error) return next({ status: 422, err: { code: 'invalid_data', message } });
    return res.status(200).json(product);
  } catch (err) {
    next({ status: 422, err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
});

module.exports = router;
