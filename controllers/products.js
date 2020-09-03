const { Router } = require('express');
const rescue = require('express-rescue');
const Boom = require('@hapi/boom');
const { productService, schemas } = require('../services');
const { verifyIdParam } = require('./middlewares');

const productsRouter = Router();

const SHOULD_NOT_EXISTS = 'should not exists';
const SHOULD_EXISTS = 'should exists';

function validateProduct(req, _res, next) {
  const { name, quantity } = req.body || {};
  const { error } = schemas.productSchema.validate({ name, quantity });
  console.log(error)
  return error ? next(Boom.badData(error)) : next();
}

/**
 * @param {string} shouldExists define se o produto devia ou não existe e pode gerar um boom error
 */
function verifyExistenceByName(shouldExists = SHOULD_EXISTS) {
  return rescue(async (req, res, next) => {
    const { name } = req.body;
    const product = await productService.verifyExistenceByName(name, shouldExists);

    if (product && product.error) next(Boom.badData(product.message));

    res.productByName = product;
    next();
  });
}

function verifyExistenceById(shouldExists = SHOULD_EXISTS) {
  return rescue(async (req, res, next) => {
    const { id } = req.params;
    const product = await productService.verifyExistenceById(id, shouldExists);

    if (product.error) return next(Boom.notFound(product.message));

    res.productById = product;
    return next();
  });
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
  ? next(Boom.badRequest('invalid_data'))
  : res.status(200).json(product);
}

productsRouter
  .route('/')
  .get(rescue(async (_, res) => res.status(200).json({ products: await productService.getAll() })))
  .post(validateProduct, verifyExistenceByName(SHOULD_NOT_EXISTS), rescue(addProduct));

productsRouter
  .route('/:id')
  .get(verifyIdParam, rescue(getById))
  .put(validateProduct, verifyIdParam, verifyExistenceById(SHOULD_EXISTS), rescue(update))
  .delete(verifyIdParam, rescue(deleteById));

module.exports = productsRouter;
