const { Router } = require('express');
const rescue = require('express-rescue');
const Boom = require('@hapi/boom');
const { productService } = require('../services');
const { verifyIdParam } = require('./middlewares');

const productsRouter = Router();

const SHOULD_NOT_EXISTS = 'should not exists';
const SHOULD_EXISTS = 'should exists';

/**
 * @param {string} shouldExists define se o produto devia ou não existe e pode gerar error
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
  res.status(202).json(updatedProduct);
}

async function deleteById(req, res) {
  const { id } = req.params;
  const product = await productService.deleteById(id);
  return res.status(200).json(product);
}

productsRouter
  .route('/')
  .get(rescue(async (_, res) => res.status(200).json(await productService.getAll())))
  .post(
    productService.validateProduct,
    verifyExistenceByName(SHOULD_NOT_EXISTS),
    rescue(addProduct),
  );

productsRouter
  .route('/:id')
  .get(
    verifyIdParam,
    rescue(async (req, res) => res.status(200).json(await productService.getById(req.params.id))),
  )
  .put(
    productService.validateProduct,
    verifyIdParam,
    verifyExistenceById(SHOULD_EXISTS),
    rescue(update),
  ).delete(verifyIdParam, rescue(deleteById));

module.exports = productsRouter;
