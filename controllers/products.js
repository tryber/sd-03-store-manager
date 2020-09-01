const { Router } = require('express');
const rescue = require('express-rescue');
const Boom = require('@hapi/boom');
const { productService } = require('../services');

const productsRouter = Router();

/**
 * Confere se existe o produto pelo nome, caso exista adiciona na propriedade produto de res
 */
async function verifyExistenceByBody(req, res, next) {
  const { name } = req.body;
  res.product = name && (await productService.getByName(name));
  return next();
}

async function verifyExistenceById(req, res, next) {
  res.productById = await productService.getById(req.params.id);
  if (!res.productById) next(Boom.notFound("Product doesn't exist"));

  return next();
}

function verifyIdParam(req, _res, next) {
  const { id } = req.params;

  if (!id || id.length !== 24) {
    console.log(id, id.length);
    return next(Boom.notAcceptable('Wrong Id format'));
  }

  return next();
}

async function addProduct(req, res, next) {
  const { name, quantity } = req.body;
  if (res.product) return next(Boom.notAcceptable('Product already exists'));
  const createdProduct = await productService.createProduct(name, quantity);
  return res.status(201).json(createdProduct);
}

async function update(req, res, next) {
  const { name, quantity } = req.body;
  const { id } = req.params;
  if (res.product) return next(Boom.notAcceptable('"name" Already exists'));
  await productService.updateById(id, { name, quantity });
  res.status(204).end();
}

productsRouter
  .route('/')
  .get(rescue(async (_, res) => res.status(200).json(await productService.getAll())))
  .post(productService.validateProduct, rescue(verifyExistenceByBody), rescue(addProduct));

productsRouter
  .route('/:id')
  .get(
    rescue(verifyExistenceByBody),
    rescue(async (req, res) => res.status(200).json(await productService.getById(req.params.id))),
  )
  .put(productService.validateProduct, verifyIdParam, rescue(verifyExistenceById), rescue(update));

module.exports = productsRouter;
