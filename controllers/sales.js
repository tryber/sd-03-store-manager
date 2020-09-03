const express = require('express');
const rescue = require('express-rescue');
const Boom = require('@hapi/boom');
const { productService, salesServices, schemas } = require('../services');
const { verifyIdParam } = require('./middlewares');

const salesRouter = express.Router();

// const SHOULD_NOT_EXISTS = 'should not exists';
const SHOULD_EXISTS = 'should exists';

/**
 * Executa um servico de sales (salesServices) e devolve o resultado como json com o status
 * @param {string} func
 * @param {array of string} bodyParams propriedades a se passar para o sales services
 * @param {number} status
 */
function execute(func, bodyParams, status = 200) {
  return rescue(async (req, res) => {
    const params = bodyParams.map((param) => req.body[param]);
    const result = await salesServices[func](...params);
    return res.status(status).json(result);
  });
}

async function verifyExistenceOfProducts(req, _, next) {
  const ids = req.body.map(({ productId }) => productId);
  const toSaleProducts = await productService.verifyAllExistencesById(ids);

  if (toSaleProducts.error) return next(Boom.badRequest(toSaleProducts.message));

  return next();
}

function validateSale(req, _, next) {
  const { error } = schemas.saleSchema.validate({ products: req.body });

  error ? next(Boom.badData(error.message)) : next();
}

function validateProduct(req, _, next) {
  const { productId, quantity } = req.body;
  const { error } = schemas.saleProductSchema.validate({ productId, quantity });
  console.log('productId, quantity, error', productId, quantity, error.message)
  error ? next(Boom.badData(error.message)) : next();
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

    if (sale.error) return next(Boom.badRequest(sale.message));

    res.saleById = sale;
    return next();
  });
}
// async function getById(req, res) {
//   const { id } = req.params;
//   const sale = await salesServices.getById(id);
//   res.status(200).json(sale);
// }

async function updateOneItem(req, res) {
  const { id } = req.params;
  const { productId, quantity } = req.body;
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
  .get(verifyIdParam, execute('getById', ['id'], 200))
  .put(verifyIdParam, validateProduct, rescue(updateOneItem))
  .delete(verifyIdParam, verifyExistenceOfSale(SHOULD_EXISTS), rescue(deleteSale));

module.exports = salesRouter;
