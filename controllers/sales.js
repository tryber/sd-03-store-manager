const express = require('express');
const rescue = require('express-rescue');
const Boom = require('@hapi/boom');
const { productService, salesServices } = require('../services');
const { verifyIdParam } = require('./middlewares');

const salesRouter = express.Router();

async function verifyExistenceOfProducts(req, _, next) {
  const { products } = req.body;
  const ids = products.map(({ productId }) => productId);
  const toSaleProducts = await productService.verifyAllExistencesById(ids);

  if (toSaleProducts.error) return next(Boom.badRequest(product.message));

  return next();
}

async function addSale(req, res) {
  const { products } = req.body;
  const register = await salesServices.addSale(products);
  res.status(201).json(register);
}

async function getAllSales(_req, res) {
  const sales = await salesServices.getAll();
  res.status(200).json(sales);
}

async function getById(req, res) {
  const { id } = req.params;
  const sale = await salesServices.getById(id);
  res.status(200).json(sale);
}

salesRouter.route('/')
  .post(salesServices.validateSale, rescue(verifyExistenceOfProducts), rescue(addSale))
  .get(rescue(getAllSales));

salesRouter.route('/:id')
  .get(verifyIdParam, rescue(getById));

module.exports = salesRouter;
