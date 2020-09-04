const express = require('express');
const rescue = require('express-rescue');
const Boom = require('@hapi/boom');
const { salesServices, schemas } = require('../services');
const mid = require('./middlewares');

const salesRouter = express.Router();

function validateSale(req, _, next) {
  const products = req.body;
  const { error } = schemas.saleSchema.validate(products);

  return error ? next(Boom.badData(error.message, 'invalid_data')) : next();
}

function validateProducts(req, _, next) {
  const products = [...req.body];

  const { error } = products.map((prod) => schemas.saleProductSchema.validate(prod))
    .find(({ error: err }) => err) || {};

  return error ? next(Boom.badData(error.message, 'invalid_data')) : next();
}

async function addSale(req, res) {
  const register = await salesServices.addSale(req.body);
  res.status(200).json(register);
}

async function getAllSales(_req, res) {
  const sales = await salesServices.getAll();
  res.status(200).json(sales);
}

async function getById(req, res, next) {
  const { id } = req.params;
  const sale = await salesServices.getById(id);

  if (!sale) return next(Boom.notFound('Sale not found', 'not_found'));
  res.status(200).json(sale);
}

async function updateItens(req, res) {
  const { id } = req.params;
  const products = [...req.body];
  const result = await salesServices.updateItenById(id, products);
  res.status(200).json(result);
}

async function deleteSale(req, res) {
  const { id } = req.params;
  const { saleById } = res;
  await salesServices.deleteSaleById(id);
  return res.status(200).json(saleById);
}

salesRouter
  .route('/')
  .post(validateSale, rescue(addSale))
  .get(rescue(getAllSales));

salesRouter
  .route('/:id')
  .all(mid.verifyIdParam('Wrong sale ID format'))
  .get(rescue(getById))
  .put(validateProducts, rescue(updateItens))
  .delete(mid.findAndKeepById(salesServices.getById), mid.verifyExistence(true), rescue(deleteSale));

module.exports = salesRouter;
