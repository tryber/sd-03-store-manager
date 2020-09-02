const express = require('express');
const rescue = require('express-rescue');
const Boom = require('@hapi/boom');
const { productService, salesServices } = require('../services');
const { verifyIdParam } = require('./middlewares');

const sales = express.Router();

async function verifyExistenceOfProducts(req, _, next) {
  const { products } = req.body;

  for (let i = 0; i < products.length; i += 1) {
    const { productId } = products[i];
    const product = await productService.verifyExistenceById(productId, 'should exists');
    if (product.error) return next(Boom.badRequest(product.message));
  };

  return next();
}

async function addSale(req, res) {
  const { products } = req.body;
  const register = await salesServices.addSale(products);
  res.status(201).json(register);
}

async function getAllSales(req, res) {
  const sales = await salesServices.getAll();
  res.status(200).json(sales);
}

async function getById(req, res) {
  const { id } = req.params;
  const sale = await salesServices.getById(id);
  res.status(200).json(sale);
}

sales.route('/')
.post(salesServices.validateSale, rescue(verifyExistenceOfProducts), rescue(addSale))
.get(rescue(getAllSales));

sales.route('/:id')
  .get(verifyIdParam, rescue(getById));

module.exports = sales;
