const { Router } = require('express');
const rescue = require('express-rescue');
const Boom = require('@hapi/boom');
const { productService, schemas } = require('../services');
const mid = require('./middlewares');

const productsRouter = Router();

function validateProduct(req, _res, next) {
  const { name, quantity } = req.body || {};
  const { error } = schemas.productSchema.validate({ name, quantity });

  return error ? next(Boom.badData(error.message, 'invalid_data')) : next();
}

async function addProduct(req, res) {
  const { name, quantity } = req.body;
  const createdProduct = await productService.createProduct(name, quantity);
  return res.status(201).json(createdProduct);
}

async function update(req, res) {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const updatedProduct = await productService.updateById(id, { name, quantity });
  res.status(200).json(updatedProduct);
}

async function deleteById(req, res) {
  const { id } = req.params;
  const product = await productService.deleteById(id);
  return res.status(200).json(product);
}

async function getById(req, res, next) {
  const product = await productService.getById(req.params.id);
  return !product
  ? next(Boom.badRequest('invalid_data', 'invalid_data'))
  : res.status(200).json(product);
}

productsRouter
  .route('/')
  .get(rescue(async (_, res) => res.status(200).json(await productService.getAll())))
  .post(
    validateProduct,
    mid.notExistsByName(productService.getByName),
    rescue(addProduct),
  );

productsRouter
  .route('/:id')
  .all(mid.verifyIdParam())
  .get(rescue(getById))
  .put(
    validateProduct,
    mid.findAndKeepById(productService.getById),
    mid.verifyExistence(true),
    rescue(update),
  )
  .delete(rescue(deleteById));

module.exports = productsRouter;
