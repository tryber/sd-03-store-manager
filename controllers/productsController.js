const { Router } = require('express');
const {
  createProduct,
  updateProduct,
  readOrDeleteById,
  listProducts,
} = require('../services/productsServices');
const { generateError } = require('./utils');

const products = Router();

products
  .route('/')
  .post(async (req, res, next) => {
    try {
      const product = await createProduct(req.body);

      if (product.message) throw new Error(product.message);

      return res.status(201).json(product);
    } catch (error) {
      const err = generateError(422, error, 'invalid_data');
      return next(err);
    }
  })
  .get(async (_req, res, next) => {
    try {
      const productslist = await listProducts();

      return res.status(200).json({ products: productslist });
    } catch (error) {
      const err = generateError(422, error, 'invalid_data');
      return next(err);
    }
  });

products
  .route('/:id')
  .get(async (req, res, next) => {
    const { id } = req.params;
    try {
      const productById = await readOrDeleteById(id);

      return res.status(200).json(productById);
    } catch (error) {
      const err = generateError(422, error, 'invalid_data');
      return next(err);
    }
  })
  .put(async (req, res, next) => {
    const { name, quantity } = req.body;
    const { id } = req.params;
    try {
      const product = await updateProduct(id, name, quantity);

      if (product.message) throw new Error(product.message);

      return res.status(200).json(product);
    } catch (error) {
      const err = generateError(422, error, 'invalid_data');
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedProduct = await readOrDeleteById(id, 'delete');

      return res.status(200).json(deletedProduct);
    } catch (error) {
      const err = generateError(422, error, 'invalid_data');
      return next(err);
    }
  });

module.exports = products;
