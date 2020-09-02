const express = require('express');
const rescue = require('express-rescue');
const Boom = require('@hapi/boom');
const { productService, salesServices } = require('../services');
const { verifyIdParam } = require('./middlewares');

const salesRouter = express.Router();

/**
 * Executa um servico de sales (salesServices) e devolve o resultado como json com o status
 * @param {string} func
 * @param {array of string} bodyParams propriedades a se passar para o sales services
 * @param {number} status
 */
async function execute(func, bodyParams, status = 200) {
  return async (req, res) => {
    const params = bodyParams.map((param) => req.body[param]);
    const result = await salesServices[func](...params);
    return res.status(status).json(result);
  };
}

async function verifyExistenceOfProducts(req, _, next) {
  const { products } = req.body;
  const ids = products.map(({ productId }) => productId);
  const toSaleProducts = await productService.verifyAllExistencesById(ids);

  if (toSaleProducts.error) return next(Boom.badRequest(toSaleProducts.message));

  return next();
}

// async function addSale(req, res) {
//   const { products } = req.body;
//   const register = await salesServices.addSale(products);
//   res.status(201).json(register);
// }

async function getAllSales(_req, res) {
  const sales = await salesServices.getAll();
  res.status(200).json(sales);
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

salesRouter
  .route('/')
  .post(
    salesServices.validateSale,
    rescue(verifyExistenceOfProducts),
    rescue(execute('addSale', ['products'], 201)),
  )
  .get(rescue(getAllSales));

salesRouter
  .route('/:id')
  .get(verifyIdParam, rescue(execute('getById', ['id'], 200)))
  .put(verifyIdParam, salesServices.validateProduct, rescue(updateOneItem));

module.exports = salesRouter;
