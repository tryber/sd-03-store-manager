const { Router } = require('express');
const rescue = require('express-rescue');
const Boom = require('@hapi/boom');
const { productService } = require('../services');

const productsRouter = Router();

/**
 * Confere se existe o produto pelo nome, caso exista adiciona na propriedade produto de res
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function verifyExistence(req, res, next) {
  const { name } = req.body;
  res.product = name && await productService.getByName(name);
  return next();
}

async function addProduct(req, res, next) {
  const { name, quantity } = req.body;
  if (res.product) return next(Boom.notAcceptable('Product already exists'));
  const createdProduct = await productService.createProduct(name, quantity);
  return res.status(201).json(createdProduct);
}

productsRouter.route('/')
  .post(
    productService.validateProduct,
    rescue(verifyExistence),
    rescue(addProduct),
  );

module.exports = productsRouter;
