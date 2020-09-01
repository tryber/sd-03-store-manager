const { Router } = require('express');
const rescue = require('express-rescue');
const Boom = require('@hapi/boom');
const { productService } = require('../services');
const { ObjectID } = require('mongodb');

const productsRouter = Router();

/**
 * Confere se existe o produto pelo nome, caso exista adiciona na propriedade produto de res 
 */
async function verifyExistenceByBody(req, res, next) {
  const { name } = req.body;
  res.product = name && await productService.getByName(name);
  return next();
}

async function verifyExistenceByParams(req, res, next) {
  const { id } = req.params;

  if (id && id.length === 24) {
    console.log(id, id.length)
    res.id = toString(id);
    return next();
  }

  next(Boom.notFound('Wrong Id format'));
}

async function addProduct(req, res, next) {
  const { name, quantity } = req.body;
  if (res.product) return next(Boom.notAcceptable('Product already exists'));
  const createdProduct = await productService.createProduct(name, quantity);
  return res.status(201).json(createdProduct);
}

async function getById(req, res) {
  const { id } = req.params;
  
}

productsRouter.route('/')
  .get(rescue(async (_, res) => res.status(200).json(await productService.getAll())))
  .post(
    productService.validateProduct,
    rescue(verifyExistenceByBody),
    rescue(addProduct),
  );

productsRouter.route('/:id')
  .get(
    rescue(verifyExistenceByParams),
    rescue(async (req, res) => res.status(200).json(await productService.getById(req.params.id)))
    );

module.exports = productsRouter;
