const express = require('express');
const rescue = require('express-rescue');
const Boom = require('@hapi/boom');
const { salesServices, schemas } = require('../services');
const { verifyIdParam } = require('./middlewares');

const salesRouter = express.Router();

// const SHOULD_NOT_EXISTS = 'should not exists';
const SHOULD_EXISTS = 'should exists';

// async function verifyExistenceOfProducts(req, _, next) {
//   const ids = req.body.map(({ productId }) => productId);
//   const toSaleProducts = await productService.verifyAllExistencesById(ids);

//   if (toSaleProducts.error) return next(Boom.badRequest(toSaleProducts.message, 'invalid_data'));

//   return next();
// }

function validateSale(req, _, next) {
  const { error } = schemas.saleSchema.validate({ products: req.body });

  return error ? next(Boom.badData(error.message, 'invalid_data')) : next();
}

function validateProduct(req, _, next) {
  const [{ productId, quantity }] = req.body;
  const { error } = schemas.saleProductSchema.validate({ productId, quantity });

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

function verifyExistenceOfSale(shouldExists = SHOULD_EXISTS) {
  return rescue(async (req, res, next) => {
    const { id } = req.params;
    const sale = await salesServices.verifyExistenceById(id, shouldExists);

    if (sale.error) return next(Boom.badRequest(sale.message, 'invalid_data'));

    res.saleById = sale;
    return next();
  });
}

async function getById(req, res, next) {
  const { id } = req.params;
  const sale = await salesServices.getById(id);

  if (!sale) return next(Boom.notFound('Sale not found', 'not_found'));
  res.status(200).json(sale);
}

async function updateOneItem(req, res) {
  const { id } = req.params;
  const [{ productId, quantity }] = req.body;
  const result = await salesServices.updateItenById(id, productId, quantity);
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
  .get(verifyIdParam('Wrong sale ID format'), rescue(getById))
  .put(verifyIdParam('Wrong sale ID format'), validateProduct, rescue(updateOneItem))
  .delete(verifyIdParam('Wrong sale ID format'), verifyExistenceOfSale(SHOULD_EXISTS), rescue(deleteSale));

module.exports = salesRouter;
